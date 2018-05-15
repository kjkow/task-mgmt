package pl.kjkow.server.repository;

import org.springframework.data.repository.CrudRepository;
import pl.kjkow.server.model.Area;
import pl.kjkow.server.model.Task;

import java.util.Date;
import java.util.List;

/**
 * Created by kamil on 2018-04-10.
 */
public interface TaskRepository extends CrudRepository<Task, Long> {

    void deleteByFinnishedBeforeAndArea(Date expiryDate, Area area);

    long countByAreaAndUserId(Area area, String userId);

    List<Task> findByUserId(String userId);
}
