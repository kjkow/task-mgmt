package pl.kjkow.server.rest;

import org.junit.Test;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pl.kjkow.server.model.User;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

public class UserRestTest extends RestTest {

    @Test
    public void getUserById() {
        ResponseEntity<User> response = restTemplate.exchange(
                "/users/123456/testing@example.com",
                HttpMethod.GET,
                new HttpEntity<>(getAuthenticationHeaders()),
                User.class);
        User recived = response.getBody();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(recived.getName(), "John Tester");
        assertEquals(recived.getEmail(), "testing@example.com");
        assertFalse(recived.isNotifications());
    }

    @Test
    public void addUser() {
    }

    @Test
    public void updateUserData() {
    }
}