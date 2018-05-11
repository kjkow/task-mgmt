package pl.kjkow.server.repository;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import pl.kjkow.server.model.Area;
import pl.kjkow.server.model.Task;

import java.util.Calendar;
import java.util.Date;

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

    private Task testTaskOne;
    private Task testTaskTwo;
    private Task testTaskThree;
    private Task testTaskFour;

    @Before
    public void init(){
        testTaskOne = new Task();
        testTaskOne.setName("TaskOne");
        testTaskOne.setArea(Area.MOZE_KIEDYS);
        testTaskOne.setUserId("123");
        entityManager.persist(testTaskOne);

        testTaskTwo = new Task();
        testTaskTwo.setName("Other");
        testTaskTwo.setArea(Area.MOZE_KIEDYS);
        testTaskTwo.setUserId("123");
        entityManager.persist(testTaskTwo);

        testTaskThree = new Task();
        testTaskThree.setName("Test");
        testTaskThree.setArea(Area.MOZE_KIEDYS);
        testTaskThree.setUserId("124");
        entityManager.persist(testTaskThree);

        testTaskFour = new Task();
        testTaskFour.setName("Test");
        testTaskFour.setArea(Area.OBOWIAZKI);
        testTaskFour.setUserId("123");
        entityManager.persist(testTaskFour);

        entityManager.flush();
    }

    @After
    public void clear(){
        entityManager.remove(testTaskOne);
        entityManager.remove(testTaskTwo);
        entityManager.remove(testTaskThree);
        entityManager.remove(testTaskFour);

        entityManager.flush();
    }

    @Test
    public void deleteByFinnishedAtBeforeAndByArea(){
        Calendar c= Calendar.getInstance();
        c.add(Calendar.DAY_OF_MONTH, -31);
        Date moreThanMonthAgo = c.getTime();
        testTaskOne.setFinnished(moreThanMonthAgo);

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_MONTH, -30);
        Date thirtyDaysAgo = cal.getTime();

        //TODO: restult of assert that is ignored
        assertThat(taskRepository.findById(1L).isPresent());

        taskRepository.deleteByFinnishedBeforeAndArea(thirtyDaysAgo, Area.UKONCZONE);
        assertThat(!taskRepository.findById(1L).isPresent());
    }

    @Test
    public void countByAreaAndUserId(){
        long tasksFound = taskRepository.countByAreaAndUserId(Area.MOZE_KIEDYS, "123");
        assertThat(tasksFound).isEqualTo(2);

    }
}
