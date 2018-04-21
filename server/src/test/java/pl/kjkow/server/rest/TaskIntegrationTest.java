package pl.kjkow.server.rest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import pl.kjkow.server.model.Area;
import pl.kjkow.server.model.Task;

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
    public void sectionNotValid(){
        Task task = new Task();
        task.setUserId(123);
        task.setArea(Area.MOZE_KIEDYS);
        task.setName("name");
        task.setSection("sekcja");

        ResponseEntity<Task> responseEntity = restTemplate.postForEntity("/tasks/add", task, Task.class);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }
}
