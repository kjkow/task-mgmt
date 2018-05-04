package pl.kjkow.server.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.kjkow.server.model.Area;
import pl.kjkow.server.model.Project;
import pl.kjkow.server.model.Task;
import pl.kjkow.server.model.User;

import java.util.Random;

/**
 * Created by kamil on 2018-05-01.
 */
@Profile("dev")
@Component
public class DataFillerOnStartup implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(DataFillerOnStartup.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    private int counter = 1;

    @Override
    public void run(ApplicationArguments applicationArguments) throws Exception {
        createTestUser();
        createTasks();
        createProjects();
        createTaskInProject();
    }

    private void createTestUser(){
        User user = new User("John Tester", "testing@example.com");
        user.setNotifications(false);
        user.setUserId("123456");
        User created = userRepository.save(user);
        log.info("Utworzono uzytkownika: " + created.getName());
    }

    private void createTasks(){
        for(Area area: Area.values()){
            log.info("Tworzenie uzytkownikow w obszarze " + area.getLabel());
            createTasksInArea(area);
        }
    }

    private void createTasksInArea(Area area){
        for (int i = 0; i < getRandomInteger(); i++) {
            Task task = new Task();
            task.setName("Test task " + counter++);
            task.setArea(area);
            task.setUserId("123456");
            Task created = taskRepository.save(task);
            log.info("Utworzono zadanie o nazwie: " + created.getName());
        }
    }

    private void createProjects(){
        Project project = new Project();
        project.setName("Test project");
        project.setDescription("This is project for testing purposes");
        project.setFinnished(false);
        project.setOrdered(false);
        Project created = projectRepository.save(project);
        log.info("Utworzono projekt o nazwie: " + created.getName());
    }

    private void createTaskInProject(){
        Task task = new Task();
        task.setName("Test task " + counter++);
        task.setArea(Area.OBOWIAZKI);
        task.setUserId("123456");
        task.setProjectId(1);
        Task created = taskRepository.save(task);
        log.info("Utworzono zadanie o nazwie: " + created.getName());
    }

    private int getRandomInteger(){
        Random random = new Random();
        return random.nextInt(5)+1;
    }
}
