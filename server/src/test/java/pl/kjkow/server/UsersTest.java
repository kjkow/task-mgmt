package pl.kjkow.server;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import pl.kjkow.server.model.User;
import pl.kjkow.server.rest.UserRest;

import static org.junit.Assert.assertEquals;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

/**
 * Created by kamil on 2018-03-30.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class UsersTest {

    private MockMvc mockMvc;

    @Autowired
    UserRest userRest;

    //@Test
    public void addUser(){
        String firstName = "Michael";
        String lastName = "Francis";
        String email = "doit@yourself.com";
        User user = new User(firstName, lastName, email);
        User returned = userRest.addUser(user);
        assertEquals(returned.getEmail(), user.getEmail());
    }

    @Test
    public void test() throws Exception {
        mockMvc.perform(get("/users/doit@yourself.com")).andExpect(status().isFound());
    }//TODO: dokonczyc test, leci nullptr
}
