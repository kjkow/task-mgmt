package pl.kjkow.server.session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.kjkow.server.repository.UserRepository;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by kamil on 2018-05-04.
 */
@Component
public class ActiveUsersStorage {

    @Autowired
    private UserRepository userRepository;

    private List<AuthenticatedUser> authenticatedUsers;

    public ActiveUsersStorage() {
        authenticatedUsers = new ArrayList<>();
    }

    public void authenticateUser(String userId, String userToken){
        if(isAuthendicated(userId, userToken)){
            refreshSession(userId);
        } else if(userRepository.findByUserId(userId).isPresent()){
            authenticate(userId, userToken);
        } else throw new RuntimeException("Cannot autenticate user. Not present in db");

    }

    public boolean isAuthendicated(String userId, String token){
        return authenticatedUsers.stream().anyMatch(user ->
            (user.getUserId().equals(userId)) &&
                    (user.getToken().equals(token)) &&
                    (user.getSessionExpires().after(new Date()))
        );
    }

    public void refreshUserSession(String userId){
        refreshSession(userId);
    }

    private void authenticate(String userId, String userToken) {
        AuthenticatedUser authenticatedUser = new AuthenticatedUser();
        authenticatedUser.setUserId(userId);
        authenticatedUser.setToken(userToken);

        Calendar date = Calendar.getInstance();
        long t = date.getTimeInMillis();
        long oneMinuteInMilisecs = 60000;
        authenticatedUser.setSessionExpires(new Date(t + (2 * oneMinuteInMilisecs)));

        authenticatedUsers.add(authenticatedUser);
    }

    private void refreshSession(String userId){
        //TODO: impl
    }
}
