package pl.kjkow.server.rest;


import org.junit.Test;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;


public class ProjectRestTest extends RestTest {


    @Test
    public void getAllProjects() {
        ResponseEntity<Object> response = restTemplate.exchange(
                RestConstants.GET_ALL_PROJECTS, HttpMethod.GET, new HttpEntity<>(getAuthenticationHeaders()), Object.class);
        System.out.println(response);

    }

    @Test
    public void addProject() {
    }

    @Test
    public void updateProject() {
    }
}