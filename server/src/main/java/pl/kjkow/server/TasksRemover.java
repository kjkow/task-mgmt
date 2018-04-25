package pl.kjkow.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Created by Kamil.Kowalczyk on 2018-04-25.
 * https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/scheduling/support/CronSequenceGenerator.html
 * https://spring.io/guides/gs/scheduling-tasks/
 */
@Component
public class TasksRemover {

    private static final Logger log = LoggerFactory.getLogger(TasksRemover.class);

    @Scheduled(cron = "0 0 3 1 * *") //pierwszego dnia każdego miesiąca o 3 w nocy
    public void removeFinnishedTasksOlderThanMonth() {
        //TODO: mniej wiecej mam to napisane w tescie repozytorium

    }
}
