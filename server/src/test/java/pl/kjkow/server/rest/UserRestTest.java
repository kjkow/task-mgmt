package pl.kjkow.server.rest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;
import pl.kjkow.server.ServerApplication;
import pl.kjkow.server.model.User;
import pl.kjkow.server.repository.UserRepository;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;


/**
 * Created by kamil on 2018-03-31.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ServerApplication.class)
@WebAppConfiguration
public class UserRestTest {

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    private List<User> userList;
    private String email = "doit@yourself.com";
    private MockMvc mvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setUp(){
        this.mvc = webAppContextSetup(webApplicationContext).build();
        userList = new ArrayList<>();

        userRepository.deleteAll();
        userList.add(userRepository.save(new User("John Doe", "abc@example.com")));
        userList.add(userRepository.save(new User("Michelle Francis", email)));
    }

    @Test
    public void getUserByEmail() throws Exception {
        mvc.perform(get("/users/" + email))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.name", is(userList.get(1).getName())))
                .andExpect(jsonPath("$.email", is(userList.get(1).getEmail())));

    }

    @Test
    public void userNotFound() throws Exception {
        mvc.perform(get("/users/notpresent@example.com")
                .contentType(contentType))
                .andExpect(status().isNotFound());
    }

    @Test
    public void addUser() throws Exception {
        String firstName = "Percy";
        String lastName = "Jackson";
        String mail = "test@ing.com";

        //TODO: pass request body, najprawdopodobniej przez coś takiego MappingJackson2HttpMessageConverter
/*        mvc.perform(post("/users/add")
                .sessionAttr("user", new User(firstName, lastName, email)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.firstName", is(firstName)))
                .andExpect(jsonPath("$.lastName", is(lastName)))
                .andExpect(jsonPath("$.email", is(mail)));*/
    }

}