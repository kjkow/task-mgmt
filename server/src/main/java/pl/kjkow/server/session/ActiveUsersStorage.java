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

    @Value("${validate.user.token.with}")
    private String tokenValidationOption;

    private List<AuthenticatedUser> authenticatedUsers;

    public ActiveUsersStorage() {
        authenticatedUsers = new ArrayList<>();
    }

    public void register(String userId, String userToken){
        if(userTokenValid(userId, userToken) && !isRegistered(userId)) authenticate(userId, userToken);
        else if(isRegistered(userId)) log.warn("User " + userId + " already registered");
        else throw new RuntimeException("Cannot register user " + userId + " " + userToken);
    }

    public void validateAuthentication(String userId, String userToken){
        if(sessionActiveFor(userId, userToken)){
            refreshSession(getById(userId).get());
        } else if(isRegistered(userId) && userTokenValid(userId, userToken)) {
            authenticate(userId, userToken);
        }else if(!isRegistered(userId) && userTokenValid(userId, userToken)){
            log.info("User " + userId + " token valid but is not registered");
        } else throw new RuntimeException("User failed to authenticate. Id: " + userId + ". Token: " + userToken);
    }

    private boolean sessionActiveFor(String userId, String token){
        return authenticatedUsers.stream().anyMatch(user ->
                (user.getUserId().equals(userId)) &&
                (user.getToken().equals(token)) &&
                (user.getSessionExpires().after(new Date()))
        );
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

    private boolean userTokenValid(String userId, String token){ //TODO: separate class
        if(tokenValidationOption.equalsIgnoreCase("google")) return userTokenIsValid(userId, token);
        else if(tokenValidationOption.equalsIgnoreCase("none")) return true;
        else throw new RuntimeException("Invalid option for 'validate.user.token.with.' Users won't be authorized");
    }

    private boolean userTokenIsValid(String userId, String token){
        String uri = "https://www.googleapis.com/oauth2/v2/tokeninfo?access_token=" + token;
        log.info("Checking user's " + userId + " token vaild with google api: " + uri);
        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<GoogleVerificationResponse> googleResponse =
                    restTemplate.exchange(uri,
                            HttpMethod.GET, null, new ParameterizedTypeReference<GoogleVerificationResponse>() {//todo: passing null
                            });
            GoogleVerificationResponse response = googleResponse.getBody();
            if(response != null){ //todo: condition makes sense?
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

    private boolean isRegistered(String userId){
        return userRepository.findByUserId(userId).isPresent();
    }
}
