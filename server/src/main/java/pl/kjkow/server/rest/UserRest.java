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

    @GetMapping(value = "/users/{id}")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody User getUserById(@PathVariable("id") String id){
        return userRepository.findByUserId(id).orElseThrow(()-> new UserNotFoundException(id));
    }

    @RequestMapping(value = "users/add", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @RequestMapping(value = "users/{id}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody User updateUserData(@RequestBody User user, @PathVariable("id") String id) {
        if(!user.getUserId().equals(id)) throw new RuntimeException("Invalid parameter");
        User recived = userRepository.findByUserId(id).orElseThrow(()-> new UserNotFoundException(id));
        recived.setName(user.getName());
        recived.setNotifications(user.isNotifications());
        recived.setDaysBeforeDue(user.getDaysBeforeDue());
        recived.setEmail(user.getEmail());
        return userRepository.save(recived);
    }
}
