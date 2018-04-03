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
    @CrossOrigin
    public @ResponseBody User getUserByEmail(@PathVariable("email") String email){
        return userRepository.findByEmail(email).orElseThrow(()-> new UserNotFoundException(email));
    }

    @RequestMapping(value = "users/add", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody User addUser(
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam String email) {
        return userRepository.save(new User(firstName, lastName, email));
    }
}
