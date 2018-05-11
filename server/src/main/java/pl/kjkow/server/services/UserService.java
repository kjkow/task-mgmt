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

    public User register(User user){
        return userRepository.save(user);
    }

    public User updateUserData(String id, User user) {
        if(!user.getUserId().equals(id)) throw new RuntimeException("Invalid parameter");
        User recived = userRepository.findByUserIdAndEmail(id, user.getEmail()).orElseThrow(()-> new UserNotFoundException(id, user.getEmail()));
        return userRepository.save(recived);
    }
}
