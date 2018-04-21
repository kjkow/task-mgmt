package pl.kjkow.server.rest;

import org.junit.BeforeClass;
import org.junit.Test;
import pl.kjkow.server.model.Area;
import pl.kjkow.server.model.Task;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;
import static org.junit.Assert.assertEquals;

/**
 * Created by kamil on 2018-04-21.
 */
public class TaskValidationTest {

    private static Validator validator;

    @BeforeClass
    public static void setUpValidator() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    public void userIdIsNotSet() {
        Task task = new Task();
        task.setName("name");
        task.setArea(Area.MATERIALY_REFERENCYJNE);

        Set<ConstraintViolation<Task>> constraintViolations = validator.validate(task);

        assertEquals(1, constraintViolations.size());
        assertEquals("must be greater than or equal to 1", constraintViolations.iterator().next().getMessage());
    }

    @Test
    public void taskNameIsNull() {
        Task task = new Task();
        task.setUserId(123);
        task.setArea(Area.MATERIALY_REFERENCYJNE);

        Set<ConstraintViolation<Task>> constraintViolations = validator.validate(task);

        assertEquals( 1, constraintViolations.size() );
        assertEquals( "must not be null", constraintViolations.iterator().next().getMessage() );
    }

    @Test
    public void priorityOutOfRange(){
        Task task = new Task();
        task.setUserId(123);
        task.setArea(Area.MATERIALY_REFERENCYJNE);
        task.setName("name");
        task.setPriority(5);
        Set<ConstraintViolation<Task>> constraintViolations = validator.validate(task);

        assertEquals( 1, constraintViolations.size() );
        assertEquals( "must be less than or equal to 3", constraintViolations.iterator().next().getMessage() );
    }

    @Test
    public void priorityOutOfRangeNegative(){
        Task task = new Task();
        task.setUserId(123);
        task.setArea(Area.MATERIALY_REFERENCYJNE);
        task.setName("name");
        task.setPriority(-1);
        Set<ConstraintViolation<Task>> constraintViolations = validator.validate(task);

        assertEquals( 1, constraintViolations.size() );
        assertEquals( "must be greater than or equal to 0", constraintViolations.iterator().next().getMessage() );
    }

    @Test
    public void reccurenceFrequencyNegative(){
        Task task = new Task();
        task.setUserId(123);
        task.setArea(Area.MATERIALY_REFERENCYJNE);
        task.setName("name");
        task.setRecurrenceFrequency(-5);
        Set<ConstraintViolation<Task>> constraintViolations = validator.validate(task);

        assertEquals( 1, constraintViolations.size() );
        assertEquals( "must be greater than or equal to 0", constraintViolations.iterator().next().getMessage() );
    }

    @Test
    public void taskIsValid(){
        Task task = new Task();
        task.setUserId(123);
        task.setArea(Area.MATERIALY_REFERENCYJNE);
        task.setName("name");
        task.setPriority(2);

        Set<ConstraintViolation<Task>> constraintViolations = validator.validate(task);

        assertEquals( 0, constraintViolations.size() );
    }
}
