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
        task.setUserId("123");
        task.setArea(Area.MATERIALY_REFERENCYJNE);
        task.setName("name");

        ResponseEntity<Task> responseEntity = restTemplate.postForEntity("/tasks/add", task, Task.class);
        Task saved = responseEntity.getBody();

        assertNotNull(task);
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals("name", saved.getName());
        assertEquals("123", saved.getUserId());
        assertEquals(Area.MATERIALY_REFERENCYJNE, saved.getArea());

    }

    @Test
    public void sectionNotValid(){
        Task task = new Task();
        task.setUserId("123");
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
            task.setUserId("123");
            task.setArea(Area.OBOWIAZKI);
            task.setName("Task" + i);
            restTemplate.postForEntity("/tasks/add", task, Task.class);
        }

        Task task = new Task();
        task.setUserId("123");
        task.setArea(Area.OBOWIAZKI);
        task.setName("TaskOverload");
        ResponseEntity<Task> responseEntity = restTemplate.postForEntity("/tasks/add", task, Task.class);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }

    //TODO: testy walidacji docelowo mają być w klsie testów usługi a nie integracyjnej
    @Test
    public void frequencyTypeValidation(){
        Task task = new Task("Task", Area.MOZE_KIEDYS, "123");
        task.setRecurrenceFrequency(1);
        task.setFrequencyType("wrong frequency type");
        ResponseEntity<Task> responseEntity = restTemplate.postForEntity("/tasks/add", task, Task.class);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }

    @Test
    public void taskFrequencyValidationSetFrequency(){
        Task task = new Task("Task", Area.MOZE_KIEDYS, "123");
        task.setRecurrenceFrequency(1);
        ResponseEntity<Task> responseEntity = restTemplate.postForEntity("/tasks/add", task, Task.class);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }

    @Test
    public void taskFrequencyValidationSetFrequencyType(){
        Task task = new Task("Task", Area.MOZE_KIEDYS, "123");
        task.setFrequencyType("Dzienna");
        ResponseEntity<Task> responseEntity = restTemplate.postForEntity("/tasks/add", task, Task.class);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }

    @Test
    public void frequencyProperlySet(){
        Task task = new Task("Task", Area.W_PIERWSZEJ_CHWILI, "123");
        task.setFrequencyType("Dzienna");
        task.setRecurrenceFrequency(1);
        ResponseEntity<Task> responseEntity = restTemplate.postForEntity("/tasks/add", task, Task.class);
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
    }

}
