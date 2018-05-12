package pl.kjkow.server.services;

import org.junit.Rule;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import pl.kjkow.server.model.Area;
import pl.kjkow.server.model.Task;
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

    @Mock private TaskRepository mockRepository;
    @InjectMocks private TaskService taskService;

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

}