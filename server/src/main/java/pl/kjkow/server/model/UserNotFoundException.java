package pl.kjkow.server.model;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by kamil on 2018-04-01.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String userId, String email){
        super("User with id: " + userId + " and email: " + email + " not found.");
    }
}
