package pl.kjkow.server.rest;


import org.junit.Test;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * Strongly coupled with
 * @see pl.kjkow.server.repository.DataFillerOnStartup
 */
public class ProjectRestTest extends RestTest {

    @Test
    public void getAllProjects() {
        ResponseEntity<ArrayList> response = restTemplate.exchange(
                RestConstants.GET_ALL_PROJECTS, HttpMethod.GET, new HttpEntity<>(getAuthenticationHeaders()), ArrayList.class);
        assertNotNull(response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().size() > 0);
        assertEquals(((LinkedHashMap)response.getBody().get(0)).get("description"), "This is project for testing purposes");
    }

    @Test
    public void addProject() {
    }

    @Test
    public void updateProject() {
    }
}