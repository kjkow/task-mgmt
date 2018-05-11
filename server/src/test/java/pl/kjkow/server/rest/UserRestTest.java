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
        User user = new User("Mike Makovsky", "unit@tests.com");
        user.setUserId("123457");
        HttpEntity<User> httpEntity = new HttpEntity<>(user, getAuthenticationHeaders());
        ResponseEntity<User> response = restTemplate.exchange(
                RestConstants.ADD_USER,
                HttpMethod.POST,
                httpEntity,
                User.class);
        User saved = response.getBody();

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(saved.getName(), user.getName());
        assertEquals(saved.getEmail(), user.getEmail());
        assertEquals(saved.getUserId(), user.getUserId());
    }

    @Test
    public void updateUserData() {
        User user = new User("New user name", "testing@example.com");
        user.setNotifications(true);
        user.setUserId("123456");

        HttpEntity<User> httpEntity = new HttpEntity<>(user, getAuthenticationHeaders());
        ResponseEntity<User> response = restTemplate.exchange("/users/123456", HttpMethod.POST, httpEntity, User.class);
        User updated = response.getBody();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updated.getName(), user.getName());
        assertEquals(updated.getUserId(), user.getUserId());
        assertEquals(updated.isNotifications(), user.isNotifications());
        assertEquals(updated.getEmail(), user.getEmail());
    }
}