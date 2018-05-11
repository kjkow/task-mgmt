package pl.kjkow.server.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.kjkow.server.model.Project;
import pl.kjkow.server.services.ProjectService;

/**
 * Created by kamil on 2018-04-20.
 */
@RestController
public class ProjectRest {

    @Autowired
    private ProjectService projectService;

    @GetMapping(value = RestConstants.GET_ALL_PROJECTS)
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    Iterable<Project> getAllProjects(
            @RequestHeader(value="Authorization") String token,
            @RequestHeader(value="Identification") String userId){//TODO: wyszukaj po id uzytkownika
        return projectService.getAllProjects();
    }

    @RequestMapping(value = RestConstants.ADD_PROJECT, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody
    Project addProject(
            @RequestHeader(value="Authorization") String token,
            @RequestHeader(value="Identification") String userId,
            @RequestBody Project project) {
        return projectService.addProject(project);
    }

    @RequestMapping(value = RestConstants.UPDATE_PROJECT, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    Project updateProject(
            @RequestHeader(value="Authorization") String token,
            @RequestHeader(value="Identification") String userId,
            @PathVariable String projectId,
            @RequestBody Project project){
        return projectService.updateProject(project, projectId);
    }
}
