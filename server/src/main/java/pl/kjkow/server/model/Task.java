package pl.kjkow.server.model;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;


/**
 * Created by kamil on 2018-04-10.
 */
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @NotNull
    private String userId;
    @NotNull
    private String name;
    @NotNull
    private Area area;
    @Min(0)
    @Max(3)
    private int priority;
    private Date dueDate;
    @Size(max = 300)
    private String comment;
    @Size(max = 50)
    private String section;
    @Min(0)
    private int recurrenceFrequency;
    private String frequencyType;
    private int projectId;
    private boolean finnishedProjectStage;
    private int ordinalNumber;
    @CreatedDate
    private Date created;
    private Date finnished;

    public Task(String name, Area area, String userId){
        this();
        this.name = name;
        this.area = area;
        this.userId = userId;
    }

    public Task(){
        created = new Date();
    }

    public Date getFinnished() {
        return finnished;
    }

    public void setFinnished(Date finnished) {
        this.finnished = finnished;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public int getRecurrenceFrequency() {
        return recurrenceFrequency;
    }

    public void setRecurrenceFrequency(int recurrenceFrequency) {
        this.recurrenceFrequency = recurrenceFrequency;
    }

    public String getFrequencyType() {
        return frequencyType;
    }

    public void setFrequencyType(String frequencyType) {
        this.frequencyType = frequencyType;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public boolean isFinnishedProjectStage() {
        return finnishedProjectStage;
    }

    public void setFinnishedProjectStage(boolean finnishedProjectStage) {
        this.finnishedProjectStage = finnishedProjectStage;
    }

    public int getOrdinalNumber() {
        return ordinalNumber;
    }

    public void setOrdinalNumber(int ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", name='" + name + '\'' +
                ", area=" + area +
                ", priority=" + priority +
                ", dueDate=" + dueDate +
                ", comment='" + comment + '\'' +
                ", section='" + section + '\'' +
                ", recurrenceFrequency=" + recurrenceFrequency +
                ", frequencyType='" + frequencyType + '\'' +
                ", projectId=" + projectId +
                ", finnishedProjectStage=" + finnishedProjectStage +
                ", ordinalNumber=" + ordinalNumber +
                ", created=" + created +
                ", finnished=" + finnished +
                '}';
    }
}
