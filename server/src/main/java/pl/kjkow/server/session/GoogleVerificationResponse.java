package pl.kjkow.server.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by kamil on 2018-05-05.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class GoogleVerificationResponse {

    @JsonProperty("user_id")
    private String userId;
    private String email;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
