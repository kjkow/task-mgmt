package pl.kjkow.server.model;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by kamil on 2018-04-21.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TaskValidationException extends RuntimeException {
    public TaskValidationException(String validationMessage){
        super("Validation error: " + validationMessage);
    }
}
