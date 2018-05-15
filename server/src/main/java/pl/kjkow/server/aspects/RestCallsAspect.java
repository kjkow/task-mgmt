package pl.kjkow.server.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import pl.kjkow.server.session.ActiveUsersStorage;

import java.util.Arrays;
import java.util.List;

/**
 * Created by kamil on 2018-05-04.
 */
@Aspect
@Configuration
public class RestCallsAspect {

    private static final Logger log = LoggerFactory.getLogger(RestCallsAspect.class);

    @Autowired
    private ActiveUsersStorage activeUsersStorage;

    @Pointcut("execution(* pl.kjkow.server.rest.*.*(..))")
    public void restPackage(){}

    private String token;
    private String userId;

    @Before("restPackage()")
    public void beforeMethod(JoinPoint joinPoint){
        log.info(createRequestLogInformation(joinPoint));
        retriveAuthenticationData(joinPoint.getArgs());

        if(joinPoint.getSignature().toShortString().contains("addUser")){
            activeUsersStorage.register(userId, token);
        }else {
            activeUsersStorage.validateAuthentication(userId, token);
        }
    }

    @AfterReturning(pointcut = "restPackage()", returning = "returnValue")
    public void afterOkResponse(Object returnValue){
        log.info(createResponseLogInformation(returnValue));
    }//TODO: unique id for request - local uuid variable doesn't work with many requests (one uuid for more than one request)

    @AfterThrowing(throwing = "e", pointcut = "restPackage()")
    public void afterExceptionResponse(Exception e){
        log.info(createResponseLogInformation(e));
    }

    private String createRequestLogInformation(JoinPoint joinPoint){
        StringBuilder sb = new StringBuilder();
            sb.append("Client requested ")
            .append(joinPoint.getSignature().toShortString())
            .append(" with parameters:");
        for(Object o : joinPoint.getArgs()){
            sb.append("\n").append(o.toString());
        }
        return sb.toString();
    }

    private String createResponseLogInformation(Object returnedValue){
        return "Server responded with:" +
                "\n" +
                returnedValue.toString();
    }

    private void retriveAuthenticationData(Object[] joinPointArgs){
        List args = Arrays.asList(joinPointArgs);

        if(args.size() < 2) throw new RuntimeException("Missing authentication parameters");

        if(args.get(0) instanceof String) token = (String) args.get(0);
        else throw new RuntimeException("Argument type mismatch. First should be String");

        if(args.get(1) instanceof String) userId = (String) args.get(1);
        else throw new RuntimeException("Argument type mismatch. Second should be String");
    }
}
