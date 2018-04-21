package pl.kjkow.server.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.kjkow.server.model.Area;
import pl.kjkow.server.model.Task;
import pl.kjkow.server.model.TaskNotFoundException;
import pl.kjkow.server.model.TaskValidationException;
import pl.kjkow.server.repository.TaskRepository;

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
        return validateAndAddTask(task);
    }

    @GetMapping(value = "/tasks/")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    Iterable<Task> getUserByEmail(){
        return taskRepository.findAll();
    }

    @RequestMapping(value = "tasks/update/{taskId}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    Task updateTask(@PathVariable String taskId, @RequestBody Task task){
        if(taskRepository.existsById(Long.valueOf(taskId))){
            return validateAndAddTask(task);
        }else{
            throw new TaskNotFoundException(taskId);
        }
    }

    private Task validateAndAddTask(Task task){
        if(task.getSection() != null && task.getArea() != Area.MATERIALY_REFERENCYJNE)
            throw new TaskValidationException("Section is not allowed when task is outside of reference materials area");
        return taskRepository.save(task);
    }
}
