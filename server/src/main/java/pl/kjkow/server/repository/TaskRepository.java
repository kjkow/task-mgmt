package pl.kjkow.server.repository;

import org.springframework.data.repository.CrudRepository;
import pl.kjkow.server.model.Task;

/**
 * Created by kamil on 2018-04-10.
 */
public interface TaskRepository extends CrudRepository<Task, Long> {

    Iterable<Task> findByName(String name);
}
