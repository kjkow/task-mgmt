package pl.kjkow.server.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.kjkow.server.model.Task;
import pl.kjkow.server.repository.TaskRepository;

import java.util.List;

/**
 * Created by kamil on 2018-04-10.
 */
@RestController
public class TaskRest {

    @Autowired
    private TaskRepository taskRepository;

    @RequestMapping(value = "tasks/add", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    Task addTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @GetMapping(value = "/tasks/")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    Iterable<Task> getUserByEmail(){
        return taskRepository.findAll();
    }
}
