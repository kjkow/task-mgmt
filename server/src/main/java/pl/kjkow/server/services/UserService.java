package pl.kjkow.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.kjkow.server.model.User;
import pl.kjkow.server.model.UserNotFoundException;
import pl.kjkow.server.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(String userId, String email){
        return userRepository.findByUserIdAndEmail(userId, email).orElseThrow(()-> new UserNotFoundException(userId, email));
    }
}
