package pl.kjkow.server.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.kjkow.server.model.Project;
import pl.kjkow.server.model.ProjectNotFoundException;
import pl.kjkow.server.repository.ProjectRepository;

/**
 * Created by kamil on 2018-04-20.
 */
@RestController
public class ProjectRest {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping(value = "/projects/")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    Iterable<Project> getAllProjects(){
        return projectRepository.findAll();
    }

    @RequestMapping(value = "projects/add", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    Project addProject(@RequestBody Project project) {
        return projectRepository.save(project);
    }

    @RequestMapping(value = "tasks/update/{taskId}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    Project updateProject(@PathVariable String projectId, @RequestBody Project project){
        if(projectRepository.existsById(Long.valueOf(projectId))){
            return projectRepository.save(project);
        }else{
            throw new ProjectNotFoundException(projectId);
        }
    }
}
