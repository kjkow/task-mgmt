package pl.kjkow.server.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.Signature;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

import static org.mockito.Mockito.*;

public class RestCallsAspectTest {

    @Rule
    public ExpectedException expectedEx = ExpectedException.none();

    @Rule
    public MockitoRule mockitoRule = MockitoJUnit.rule();

    @Mock
    private JoinPoint joinPoint;

    private RestCallsAspect restCallsAspect = new RestCallsAspect();

    @Before
    public void init(){
        Signature mockedSignature = mock(Signature.class);
        when(joinPoint.getSignature()).thenReturn(mockedSignature);
    }

    @Test
    public void missingAuthParameters() {
        Object[] args = {"parameter"};
        when(joinPoint.getArgs()).thenReturn(args);

        expectedEx.expect(RuntimeException.class);
        expectedEx.expectMessage("Missing authentication parameters");
        restCallsAspect.beforeMethod(joinPoint);
    }

    @Test
    public void firstArgMismatch(){
        Object[] args = {5, "parameter"};
        when(joinPoint.getArgs()).thenReturn(args);

        expectedEx.expect(RuntimeException.class);
        expectedEx.expectMessage("Argument type mismatch. First should be String");
        restCallsAspect.beforeMethod(joinPoint);
    }

    @Test
    public void secondArgMismatch(){
        Object[] args = {"parameter", 5};
        when(joinPoint.getArgs()).thenReturn(args);

        expectedEx.expect(RuntimeException.class);
        expectedEx.expectMessage("Argument type mismatch. Second should be String");
        restCallsAspect.beforeMethod(joinPoint);
    }
}