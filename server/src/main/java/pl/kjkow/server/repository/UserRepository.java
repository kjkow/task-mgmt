package pl.kjkow.server.repository;

import org.springframework.data.repository.CrudRepository;
import pl.kjkow.server.model.User;

/**
 * Created by kamil on 2018-03-30.
 */
public interface UserRepository extends CrudRepository<User, Long> {

    User findByEmail(String email);

}
