package pl.kjkow.server;

public class RestConstants {

    public static final String GET_ALL_PROJECTS = "/projects/";
    public static final String ADD_PROJECT = "/projects/add/";
    public static final String UPDATE_PROJECT = "projects/update/{projectId}";

    public static final String ADD_TASK = "/tasks/add/";
    public static final String GET_ALL_TASKS = "/tasks/{id}";
    public static final String UPDATE_TASK = "/tasks/update/{taskId}";

    public static final String GET_USER_BY_ID = "/users/{id}/{email}";
    public static final String ADD_USER = "/users/add";
    public static final String UPDATE_USER_DATA = "/users/{id}";
}
