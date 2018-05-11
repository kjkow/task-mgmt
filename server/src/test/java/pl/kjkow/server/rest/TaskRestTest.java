package pl.kjkow.server.rest;

import org.junit.Test;
import org.springframework.http.*;
import pl.kjkow.server.model.Area;
import pl.kjkow.server.model.Task;

import java.util.ArrayList;
import java.util.LinkedHashMap;

import static org.junit.Assert.*;

public class TaskRestTest extends RestTest {

    @Test
    public void addTask() {
        Task task = new Task();
        task.setUserId("123456");
        task.setArea(Area.MATERIALY_REFERENCYJNE);
        task.setName("name");

        HttpEntity<Task> taskHttpEntity = new HttpEntity<>(task, getAuthenticationHeaders());
        ResponseEntity<Task> response = restTemplate.exchange(RestConstants.ADD_TASK, HttpMethod.POST, taskHttpEntity, Task.class);
        Task saved = response.getBody();

        assertNotNull(task);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(task.getName(), saved.getName());
        assertEquals(task.getUserId(), saved.getUserId());
        assertEquals(task.getArea(), saved.getArea());
    }

    @Test
    public void getAllTasks() {
        ResponseEntity<ArrayList> response = restTemplate.exchange(
                "/tasks/123456", HttpMethod.GET, new HttpEntity<>(getAuthenticationHeaders()), ArrayList.class);
        assertNotNull(response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().size() > 0);
    }

    @Test
    public void updateTask() {
        ResponseEntity<ArrayList> allTasks = restTemplate.exchange(
                "/tasks/123456", HttpMethod.GET, new HttpEntity<>(getAuthenticationHeaders()), ArrayList.class);

        if(allTasks.getBody().size() == 0) throw new RuntimeException("Cannot proceed test");
        int id = (int) ((LinkedHashMap)allTasks.getBody().get(0)).get("id");

        Task task = new Task();
        task.setId((long) id);
        task.setName("New task name");
        task.setUserId("123456");
        task.setArea(Area.MATERIALY_REFERENCYJNE);


        HttpEntity<Task> httpEntity = new HttpEntity<>(task, getAuthenticationHeaders());
        ResponseEntity<Task> response = restTemplate.exchange("/tasks/update/" + id, HttpMethod.POST, httpEntity, Task.class);
        Task updated = response.getBody();

        assertNotNull(updated);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updated.getName(), task.getName());
        assertEquals(updated.getId(), task.getId());
        assertEquals(updated.getUserId(), task.getUserId());
    }
}