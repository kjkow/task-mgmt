package pl.kjkow.server.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Pointcut;
import org.junit.Test;
import org.mockito.Mock;

import java.lang.reflect.Method;

import static com.sun.javaws.JnlpxArgs.verify;
import static org.junit.Assert.*;
import static org.mockito.Mockito.times;

public class RestCallsAspectTest {

    @Mock
    private JoinPoint joinPoint;

    @Test
    public void afterOkResponse() {
        //verify(joinPoint, times(1))
        //https://stackoverflow.com/questions/41389015/junit-tests-for-aspectj
    }

    @Test
    public void afterExceptionResponse() {
    }
}