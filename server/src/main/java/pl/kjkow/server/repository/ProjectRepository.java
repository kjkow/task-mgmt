package pl.kjkow.server.repository;

import org.springframework.data.repository.CrudRepository;
import pl.kjkow.server.model.Project;

/**
 * Created by kamil on 2018-04-20.
 */
public interface ProjectRepository extends CrudRepository<Project, Long> {
}
