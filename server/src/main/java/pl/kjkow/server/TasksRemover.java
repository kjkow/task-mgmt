package pl.kjkow.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pl.kjkow.server.model.Area;
import pl.kjkow.server.repository.TaskRepository;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by Kamil.Kowalczyk on 2018-04-25.
 * https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/scheduling/support/CronSequenceGenerator.html
 * https://spring.io/guides/gs/scheduling-tasks/
 */
@Component
public class TasksRemover {

    private static final Logger log = LoggerFactory.getLogger(TasksRemover.class);

    @Autowired
    private TaskRepository taskRepository;

    @Scheduled(cron = "0 0 3 1 * *") //pierwszego dnia każdego miesiąca o 3 w nocy
    public void removeFinnishedTasksOlderThanMonth() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_MONTH, -30);
        Date thirtyDaysAgo = cal.getTime();

        taskRepository.deleteByFinnishedBeforeAndArea(thirtyDaysAgo, Area.UKONCZONE);
    }
}
