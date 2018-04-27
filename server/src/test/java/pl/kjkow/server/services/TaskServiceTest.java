package pl.kjkow.server.services;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.ContextConfiguration;
import pl.kjkow.server.model.Area;
import pl.kjkow.server.model.Task;
import pl.kjkow.server.repository.TaskRepository;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

/**
 * Created by kamil on 2018-04-27.
 */
@RunWith(MockitoJUnitRunner.class)
@ContextConfiguration(value = "application-dev.properties")
public class TaskServiceTest {

    @Mock
    private TaskRepository mockRepository;

    @Value("${task.limit}")
    private int limit;

    @InjectMocks
    private TaskService taskService;

    @Before
    public void init(){
        testTaskOne = new Task("TaskOne", Area.MOZE_KIEDYS, 123);
        testTaskTwo = new Task("Other", Area.MOZE_KIEDYS, 123);
        testTaskThree = new Task("Test", Area.MOZE_KIEDYS, 124);
        testTaskFour = new Task("Test", Area.OBOWIAZKI, 123);
    }

    private Task testTaskOne;
    private Task testTaskTwo;
    private Task testTaskThree;
    private Task testTaskFour;

    @Test
    public void save() throws Exception {

    }

    @Test
    public void findAll() throws Exception {
        Iterable<Task> tasks = Arrays.asList(testTaskOne, testTaskTwo, testTaskThree, testTaskFour);
        when(mockRepository.findAll()).thenReturn(tasks);
        Iterable<Task> actual = taskService.findAll();
        assertEquals(actual, tasks);
    }

    @Test
    public void findByNameContaining() throws Exception {
        List<Task> found = Collections.singletonList(testTaskOne);
        when(mockRepository.findByNameContaining("Task")).thenReturn(found);
        List<Task> actual = taskService.findByNameContaining("Task");
        assertEquals(actual, found);
    }

    @Test
    public void updateTask() throws Exception {
    }

    @Test()
    public void sectionSetInWrongArea(){
        //todo: mockito wstawia w taskservice#limit wartosc 0, a nie chce brac jej z application-dev.properties
    }

}