package pl.kjkow.server.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
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

    @Before("execution(* pl.kjkow.server.rest.*.*(..))")
    private void beforeMethod(JoinPoint joinPoint){
        uuid = UUID.randomUUID();
        log.info(createLogInformation(joinPoint, "ZAPYTANIE DO SERWERA "));
    }

    @After("execution(* pl.kjkow.server.rest.*.*(..))")
    private void afterMethod(JoinPoint joinPoint){
        log.info(createLogInformation(joinPoint, "ODPOWIEDZ Z SERWERA "));
    }

    private String createLogInformation(JoinPoint joinPoint, String kierunek){
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder
                .append(kierunek)
                .append(joinPoint.getSignature().toShortString())
                .append(" ")
                .append(uuid);
        for(Object o : joinPoint.getArgs()){
            stringBuilder.append("\n");
            stringBuilder.append(o.toString());
        }
        return stringBuilder.toString();
    }
}
