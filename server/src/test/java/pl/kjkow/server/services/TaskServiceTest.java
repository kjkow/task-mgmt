package pl.kjkow.server.services;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.springframework.test.util.ReflectionTestUtils;
import pl.kjkow.server.model.Area;
import pl.kjkow.server.model.Task;
import pl.kjkow.server.model.TaskValidationException;
import pl.kjkow.server.repository.TaskRepository;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

/**
 * Created by kamil on 2018-04-27.
 */
public class TaskServiceTest {

    @Rule public MockitoRule mockitoRule = MockitoJUnit.rule();
    @Rule public ExpectedException expectedEx = ExpectedException.none();

    @Mock private TaskRepository mockRepository;
    @InjectMocks private TaskService taskService;

    @Before
    public void init(){
        ReflectionTestUtils.setField(taskService, "taskLimit", 5);
    }

    @Test
    public void findAll() {
        List<Task> tasks = Arrays.asList(
                new Task("TaskOne", Area.MOZE_KIEDYS, "123"),
                new Task("Other", Area.MOZE_KIEDYS, "123"),
                new Task("Test", Area.OBOWIAZKI, "123"));
        when(mockRepository.findByUserId("123")).thenReturn(tasks);
        List<Task> actual = taskService.findAll("123");
        assertEquals(actual, tasks);
    }

    @Test
    public void save(){
        Task task = new Task();
        task.setArea(Area.MATERIALY_REFERENCYJNE);
        task.setUserId("123");
        task.setName("Name");

        Task expected = new Task();
        expected.setId(1L);
        expected.setArea(Area.MATERIALY_REFERENCYJNE);
        expected.setUserId("123");
        expected.setName("Name");

        when(mockRepository.save(task)).thenReturn(expected);

        Task actual = taskService.save(task);
        assertEquals(actual, expected);
    }

    @Test
    public void sectionInvalid(){
        Task task = new Task();
        task.setArea(Area.OBOWIAZKI);
        task.setUserId("123");
        task.setName("Name");
        task.setSection("secion");

        expectedEx.expect(TaskValidationException.class);
        expectedEx.expectMessage("Section is not allowed when task is outside of reference materials area");
        taskService.save(task);
    }

    @Test
    public void reachedTaskLimitInArea(){
        when(mockRepository.countByAreaAndUserId(Area.OBOWIAZKI, "123")).thenReturn(5L);

        Task task = new Task();
        task.setArea(Area.OBOWIAZKI);
        task.setUserId("123");
        task.setName("Name");

        expectedEx.expect(TaskValidationException.class);
        expectedEx.expectMessage("Task limit reached in section " + task.getArea().getLabel());
        taskService.save(task);
    }

}