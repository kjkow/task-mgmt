package pl.kjkow.server.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.kjkow.server.model.User;
import pl.kjkow.server.services.UserService;

/**
 * Created by kamil on 2018-03-30.
 */
@RestController
public class UserRest {

    @Autowired
    private UserService userService;

    @GetMapping(value = RestConstants.GET_USER_BY_ID)
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody User getUserById(
            @RequestHeader(value="Authorization") String token,
            @RequestHeader(value="Identification") String userId,
            @PathVariable("id") String id,
            @PathVariable("email") String email){
        return userService.getUserById(id, email);
    }

    @RequestMapping(value = RestConstants.ADD_USER, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody User addUser(
            @RequestHeader(value="Authorization") String token,
            @RequestHeader(value="Identification") String userId,
            @RequestBody User user) {
        return userService.register(user);
    }

    @RequestMapping(value = RestConstants.UPDATE_USER_DATA, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody User updateUserData(
            @RequestHeader(value="Authorization") String token,
            @RequestHeader(value="Identification") String userId,
            @RequestBody User user,
            @PathVariable("id") String id) {
        return userService.updateUserData(id, user);
    }
}
