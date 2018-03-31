package pl.kjkow.server.rest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import pl.kjkow.server.model.User;

import java.nio.charset.Charset;

import static org.junit.Assert.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


/**
 * Created by kamil on 2018-03-31.
 */
@RunWith(SpringRunner.class)
@WebMvcTest(UserRest.class)
public class UserRestTest {

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserRest userRest;

    @Test
    public void getUserByEmail() throws Exception {
        String email = "doit@yourself.com";
        User user = new User();
        user.setEmail(email);

        given(userRest.getUserByEmail(email)).willReturn(user);

/*        mvc.perform(get("/users/" + email))
                .andExpect(status().isFound())
                .andExpect(content().contentType(contentType))*/
//https://spring.io/guides/tutorials/bookmarks/ TODO: dokonczyc (ustawianie listy users oraz wstrzykniecie UserRepository

    }

    @Test
    public void addUser() throws Exception {
    }

}