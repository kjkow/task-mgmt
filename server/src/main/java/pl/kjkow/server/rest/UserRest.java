package pl.kjkow.server.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.kjkow.server.model.User;
import pl.kjkow.server.model.UserNotFoundException;
import pl.kjkow.server.repository.UserRepository;

/**
 * Created by kamil on 2018-03-30.
 */
@RestController
public class UserRest {

    @Autowired
    private UserRepository userRepository;

    @GetMapping(value = "/users/{email}")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody User getUserByEmail(@PathVariable("email") String email){
        return userRepository.findByEmail(email).orElseThrow(()-> new UserNotFoundException(email));
    }

    @RequestMapping(value = "/add", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody User addUser(User user) {
        return userRepository.save(user);//TODO: dokonczyc
    }
}
