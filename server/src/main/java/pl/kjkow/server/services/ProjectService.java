package pl.kjkow.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.kjkow.server.model.Project;
import pl.kjkow.server.model.ProjectNotFoundException;
import pl.kjkow.server.repository.ProjectRepository;


@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Iterable<Project> getAllProjects(){
        return projectRepository.findAll();
    }

    public Project addProject(Project project){
        return projectRepository.save(project);
    }

    public Project updateProject(Project project, String projectId){
        if(projectRepository.existsById(Long.valueOf(projectId))){
            return projectRepository.save(project);
        }else{
            throw new ProjectNotFoundException(projectId);
        }
    }
}
