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

import java.util.Arrays;
import java.util.List;

/**
 * Created by kamil on 2018-04-10.
 */
@RestController
public class TaskRest {

    @Autowired
    private TaskRepository taskRepository;

    @Value("${task.limit}")
    private int taskLimit;

    @RequestMapping(value = "tasks/add", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    Task addTask(@RequestBody Task task) {
        return validateAndAddTask(task);
    }

    @GetMapping(value = "/tasks/")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    Iterable<Task> getAllTasks(){
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

    @GetMapping(value = "tasks/search{name}")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    List<Task> getTasksByName(@PathVariable String name){
        return taskRepository.findByNameContaining(name);
    }

    private Task validateAndAddTask(Task task){
        if(sectionIsValidFor(task))
            throw new TaskValidationException("Section is not allowed when task is outside of reference materials area");
        if(taskLimitInAreaReached(task))
            throw new TaskValidationException("Task limit reached in section " + task.getArea().getLabel());
        if(!frequencyTypeValid(task)){
            throw new TaskValidationException(task.getFrequencyType() + " is not allowed as tasks frequency type");
        }
        return taskRepository.save(task);
    }

    private boolean frequencyTypeValid(Task task){
        String taskFrequency = task.getFrequencyType();
        List<String> allowed = Arrays.asList("", "Dzienna", "Miesięczna");
        return allowed.contains(taskFrequency);
    } //TODO:test, enum

    private boolean taskLimitInAreaReached(Task task){
        return taskRepository.countByAreaAndUserId(task.getArea(), task.getUserId()) > taskLimit - 1;
    }

    private boolean sectionIsValidFor(Task task){
        return task.getSection() != null && task.getArea() != Area.MATERIALY_REFERENCYJNE;
    }
}
