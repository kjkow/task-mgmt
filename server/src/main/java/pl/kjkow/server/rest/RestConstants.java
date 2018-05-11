package pl.kjkow.server.rest;

class RestConstants {

    static final String GET_ALL_PROJECTS = "/projects/";
    static final String ADD_PROJECT = "/projects/add/";
    static final String UPDATE_PROJECT = "projects/update/{projectId}";

    static final String ADD_TASK = "/tasks/add/";
    static final String GET_ALL_TASKS = "/tasks/{id}";
    static final String UPDATE_TASK = "tasks/update/{taskId}";

    static final String GET_USER_BY_ID = "/users/{id}/{email}";
    static final String ADD_USER = "users/add";
    static final String UPDATE_USER_DATA = "users/{id}";
}
