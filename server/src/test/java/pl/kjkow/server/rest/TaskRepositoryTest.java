package pl.kjkow.server.rest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import pl.kjkow.server.model.Area;
import pl.kjkow.server.model.Task;
import pl.kjkow.server.repository.TaskRepository;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created by Kamil.Kowalczyk on 2018-04-24.
 */
@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
public class TaskRepositoryTest {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void findTasksByNameContaining(){
        Task task = new Task();
        task.setName("TaskOne");
        task.setArea(Area.MOZE_KIEDYS);
        task.setUserId(123);
        entityManager.persist(task);
        Task task2 = new Task();
        task2.setName("Other");
        task2.setArea(Area.MOZE_KIEDYS);
        task2.setUserId(123);
        entityManager.persist(task2);
        entityManager.flush();


        Iterable<Task> foundAll = taskRepository.findAll();
        foundAll.forEach(t -> System.out.println(t.getName()));

        List<Task> found = taskRepository.findByNameContaining("Task");
        assertThat(found.size()).isEqualTo(1);
    }
}
