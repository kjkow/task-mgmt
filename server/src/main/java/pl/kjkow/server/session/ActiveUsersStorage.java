package pl.kjkow.server.session;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import pl.kjkow.server.repository.UserRepository;

import java.util.*;

/**
 * Created by kamil on 2018-05-04.
 */
@Component
public class ActiveUsersStorage {

    private static final Logger log = LoggerFactory.getLogger(ActiveUsersStorage.class);

    @Autowired
    private UserRepository userRepository;

    @Value("${session.time.minutes}")
    private int sessionTimeInMinutes;

    private List<AuthenticatedUser> authenticatedUsers;

    public ActiveUsersStorage() {
        authenticatedUsers = new ArrayList<>();
    }

    public void authenticateUser(String userId, String userToken){
        if(isAuthendicated(userId, userToken) && getById(userId).isPresent()){ //todo: dziwna konstrukcja, sprawdza prawie to samo
            refreshSession(getById(userId).get());
        } else if(userRepository.findByUserId(userId).isPresent() && userTokenIsValid(userId, userToken)){
            authenticate(userId, userToken);
        } else log.warn("User failed to authenticate. Id: " + userId + ". Token: " + userToken);

    }

    public boolean isAuthendicated(String userId, String token){
        return authenticatedUsers.stream().anyMatch(user ->
            (user.getUserId().equals(userId)) &&
                    (user.getToken().equals(token)) &&
                    (user.getSessionExpires().after(new Date()))
        );
    }

    public void refreshUserSession(String userId){
        if(getById(userId).isPresent()) refreshSession(getById(userId).get());
    }

    private void authenticate(String userId, String userToken) {
        AuthenticatedUser authenticatedUser = new AuthenticatedUser();
        authenticatedUser.setUserId(userId);
        authenticatedUser.setToken(userToken);
        refreshSession(authenticatedUser);
        authenticatedUsers.add(authenticatedUser);
    }

    private void refreshSession(AuthenticatedUser authenticatedUser){
        Calendar date = Calendar.getInstance();
        long t = date.getTimeInMillis();
        long oneMinuteInMilisecs = 60000;
        authenticatedUser.setSessionExpires(new Date(t + (sessionTimeInMinutes * oneMinuteInMilisecs)));
    }

    private Optional<AuthenticatedUser> getById(String id){
        return authenticatedUsers.stream().filter(user -> user.getUserId().equals(id)).findFirst();
    }

    private boolean userTokenIsValid(String userId, String token){
        String uri = "https://www.googleapis.com/oauth2/v2/tokeninfo?access_token=" + token;
        log.info("Checking user's " + userId + " token vaild with google api: " + uri);
        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<GoogleVerificationResponse> googleResponse =
                    restTemplate.exchange(uri,
                            HttpMethod.GET, null, new ParameterizedTypeReference<GoogleVerificationResponse>() {
                            });
            GoogleVerificationResponse response = googleResponse.getBody();
            if(response != null){
                log.info("User's " + userId + " token validation response: " + response.toString());
                return  response.getUserId().equals(userId);
            }else {
                log.warn("User's " + userId + " token validation response is null");
                return false;
            }
        } catch (RestClientException e){
            log.warn("Users token verification failed for user id: " + userId + ". Cause: " + e.getMessage());
            return false;
        }
    }
}
