package pl.kjkow.server.rest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import pl.kjkow.server.model.Area;
import pl.kjkow.server.model.Task;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;


/**
 * Created by kamil on 2018-04-21.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TaskIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Value("${task.limit}")
    private int taskLimit;

    @Test
    public void saveTask() throws Exception {
        Task task = new Task();
        task.setUserId(123);
        task.setArea(Area.MATERIALY_REFERENCYJNE);
        task.setName("name");

        ResponseEntity<Task> responseEntity = restTemplate.postForEntity("/tasks/add", task, Task.class);
        Task saved = responseEntity.getBody();

        assertNotNull(task);
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals("name", saved.getName());
        assertEquals(123, saved.getUserId());
        assertEquals(Area.MATERIALY_REFERENCYJNE, saved.getArea());

    }

    @Test
    public void findByNameContaining(){
        Task task = new Task();
        task.setUserId(123);
        task.setArea(Area.MATERIALY_REFERENCYJNE);
        task.setName("Task");
        restTemplate.postForEntity("/tasks/add", task, Task.class);

        Task second = new Task();
        second.setUserId(123);
        second.setArea(Area.MATERIALY_REFERENCYJNE);
        second.setName("Second");
        restTemplate.postForEntity("/tasks/add", second, Task.class);

        ResponseEntity<List> responseEntity = restTemplate.getForEntity("/tasks/search?name=Task", List.class);
        //todo: testing repository works fine, here and in app returns all tasks
    }

    @Test
    public void sectionNotValid(){
        Task task = new Task();
        task.setUserId(123);
        task.setArea(Area.MOZE_KIEDYS);
        task.setName("name");
        task.setSection("sekcja");

        ResponseEntity<Task> responseEntity = restTemplate.postForEntity("/tasks/add", task, Task.class);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }

    @Test
    public void tasksInAreaLimitReached(){
        for (int i = 0; i < taskLimit; i++) {
            Task task = new Task();
            task.setUserId(123);
            task.setArea(Area.OBOWIAZKI);
            task.setName("Task" + i);
            restTemplate.postForEntity("/tasks/add", task, Task.class);
        }

        Task task = new Task();
        task.setUserId(123);
        task.setArea(Area.OBOWIAZKI);
        task.setName("TaskOverload");
        ResponseEntity<Task> responseEntity = restTemplate.postForEntity("/tasks/add", task, Task.class);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }
}
