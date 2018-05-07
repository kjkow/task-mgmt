package pl.kjkow.server.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

import java.util.UUID;

/**
 * Created by kamil on 2018-05-04.
 */
@Aspect
@Configuration
public class RestCallsAspect {

    private static final Logger log = LoggerFactory.getLogger(RestCallsAspect.class);
    private UUID uuid;

    @Pointcut("execution(* pl.kjkow.server.rest.*.*(..))")
    public void restPackage(){}

    @Before("restPackage()")
    private void beforeMethod(JoinPoint joinPoint){
        uuid = UUID.randomUUID();
        log.info(createRequestLogInformation(joinPoint));
    }

    @AfterReturning(pointcut = "restPackage()", returning = "returnValue")
    public void afterOkResponse(Object returnValue){
        log.info(createResponseLogInformation(returnValue));
    }

    @AfterThrowing(throwing = "e", pointcut = "restPackage()")
    public void afterExceptionResponse(Exception e){
        log.info(createResponseLogInformation(e.getMessage()));
    }

    private String createRequestLogInformation(JoinPoint joinPoint){
        StringBuilder sb = new StringBuilder();
            sb.append("Client requested ")
            .append(joinPoint.getSignature().toShortString())
            .append(" ")
            .append(uuid)
            .append(" with parameters:");
        for(Object o : joinPoint.getArgs()){
            sb.append("\n").append(o.toString());
        }
        return sb.toString();
    }

    private String createResponseLogInformation(Object returnedValue){
        return "Server responded " +
                " " +
                uuid +
                " with:" +
                "\n" +
                returnedValue.toString();
    }
}
