package pl.kjkow.server.repository;

import org.springframework.data.repository.CrudRepository;
import pl.kjkow.server.model.User;

import java.util.Optional;

/**
 * Created by kamil on 2018-03-30.
 */
public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUserId(String userId);

    Optional<User> findByUserIdAndEmail(String userId, String email);

}
