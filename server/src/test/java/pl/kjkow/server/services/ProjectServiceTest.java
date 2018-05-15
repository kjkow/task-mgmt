package pl.kjkow.server.services;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import pl.kjkow.server.model.Project;
import pl.kjkow.server.model.ProjectNotFoundException;
import pl.kjkow.server.repository.ProjectRepository;

import static org.mockito.Mockito.*;


public class ProjectServiceTest {

    @Rule public ExpectedException expectedEx = ExpectedException.none();
    @Rule public MockitoRule mockitoRule = MockitoJUnit.rule();

    @InjectMocks private ProjectService projectService;
    @Mock private ProjectRepository projectRepository;

    @Test
    public void noProjectFound(){
        Project mockedProject = mock(Project.class);
        when(projectRepository.existsById(1L)).thenReturn(false);

        expectedEx.expect(ProjectNotFoundException.class);
        expectedEx.expectMessage("Project with id 1 not found.");
        projectService.updateProject(mockedProject, "1");
    }

}