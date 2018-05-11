package pl.kjkow.server.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.kjkow.server.model.Area;
import pl.kjkow.server.model.Task;
import pl.kjkow.server.model.TaskNotFoundException;
import pl.kjkow.server.model.TaskValidationException;
import pl.kjkow.server.repository.TaskRepository;
import pl.kjkow.server.services.TaskService;

import java.util.Arrays;
import java.util.List;

/**
 * Created by kamil on 2018-04-10.
 */
@RestController
public class TaskRest {

    @Autowired
    private TaskService taskService;

    @RequestMapping(value = RestConstants.ADD_TASK, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    Task addTask(@RequestHeader(value="Authorization") String token,
                 @RequestHeader(value="Identification") String userId,
                 @RequestBody Task task) {
        return taskService.save(task);
    }

    @GetMapping(value = "/tasks/{id}")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    List<Task> getAllTasks(
            @RequestHeader(value="Authorization") String token,
            @RequestHeader(value="Identification") String userId,
            @PathVariable String id){
        return taskService.findAll(id);
    }

    @RequestMapping(value = "tasks/update/{taskId}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    Task updateTask(
            @RequestHeader(value="Authorization") String token,
            @RequestHeader(value="Identification") String userId,
            @PathVariable String taskId, @RequestBody Task task){
        return taskService.updateTask(taskId, task);
    }
}
