package pl.kjkow.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pl.kjkow.server.model.Area;
import pl.kjkow.server.model.Task;
import pl.kjkow.server.model.TaskNotFoundException;
import pl.kjkow.server.model.TaskValidationException;
import pl.kjkow.server.repository.TaskRepository;

import java.util.Arrays;
import java.util.List;

/**
 * Created by kamil on 2018-04-27.
 */
@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Value("${task.limit}")
    private int taskLimit;

    public Task save(Task task){
        validateTask(task);
        return taskRepository.save(task);
    }

    public List<Task> findAll(String userId){
        return taskRepository.findByUserId(userId);
    }

    public Task updateTask(String taskId, Task task){
        if(taskRepository.existsById(Long.valueOf(taskId))){
            return save(task);
        }else{
            throw new TaskNotFoundException(taskId);
        }
    }

    private void validateTask(Task task){
        if(sectionIsValidFor(task))
            throw new TaskValidationException("Section is not allowed when task is outside of reference materials area");
        if(taskLimitInAreaReached(task))
            throw new TaskValidationException("Task limit reached in section " + task.getArea().getLabel());
        if(!frequencyTypeValid(task)){
            throw new TaskValidationException(task.getFrequencyType() + " is not allowed as tasks frequency type");
        }
        if(!taskFrequencyValid(task)){
            throw new TaskValidationException("If one of the frequency options is selected, other must be as well. " +
                    "Frequency type:" + task.getFrequencyType() + ". Frequency reccurence: " + task.getRecurrenceFrequency());
        }
    }

    private boolean taskFrequencyValid(Task task){
        if((task.getFrequencyType() != null || (task.getFrequencyType() != null && !task.getFrequencyType().equals(""))) && task.getRecurrenceFrequency() <= 0){
            return false;
        }
        if(task.getRecurrenceFrequency() > 0 && (task.getFrequencyType() == null || (task.getFrequencyType() != null &&task.getFrequencyType().equals("")))){
            return false;
        }
        return true;
    }//TODO: testy uslugi, w tym tej metody

    private boolean frequencyTypeValid(Task task){
        String taskFrequency = task.getFrequencyType();
        List<String> allowed = Arrays.asList("", "Dzienna", "Miesięczna", null);
        return allowed.contains(taskFrequency);
    } //TODO:test, enum

    private boolean taskLimitInAreaReached(Task task){
        return taskRepository.countByAreaAndUserId(task.getArea(), task.getUserId()) > taskLimit - 1;
    }

    private boolean sectionIsValidFor(Task task){
        return task.getSection() != null && task.getArea() != Area.MATERIALY_REFERENCYJNE;
    }
}
