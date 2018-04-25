package pl.kjkow.server.model;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.Date;

/**
 * Created by kamil on 2018-03-30.
 */
@Entity
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String name;
    @Email
    private String email;
    @CreatedDate
    private Date created;
    private boolean notifications;
    private int daysBeforeDue;

    private User() {
        created = new Date();
    }

    public User(String name, String email) {
        this.name = name;
        this.email = email;
        created = new Date();
    }

    public boolean isNotifications() {
        return notifications;
    }

    public void setNotifications(boolean notifications) {
        this.notifications = notifications;
    }

    public int getDaysBeforeDue() {
        return daysBeforeDue;
    }

    public void setDaysBeforeDue(int daysBeforeDue) {
        this.daysBeforeDue = daysBeforeDue;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
