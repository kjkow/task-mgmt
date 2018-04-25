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

    @RequestMapping(value = "users/add", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @RequestMapping(value = "users/{userName}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody User updateUserData(@RequestBody User user, @PathVariable("userName") String userName) {
        User recived = userRepository.findByEmail(user.getEmail()).orElseThrow(() -> new UserNotFoundException(user.getEmail()));
        recived.setName(user.getName());
        recived.setNotifications(user.isNotifications());
        recived.setDaysBeforeDue(user.getDaysBeforeDue());
        return userRepository.save(recived);
    }
}
