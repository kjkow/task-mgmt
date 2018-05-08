package pl.kjkow.server.session;

import java.util.Date;

/**
 * Created by kamil on 2018-05-04.
 */
public class AuthenticatedUser {
    private String userId;
    private String token;
    private Date sessionExpires;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getSessionExpires() {
        return sessionExpires;
    }

    public void setSessionExpires(Date sessionExpires) {
        this.sessionExpires = sessionExpires;
    }
}
