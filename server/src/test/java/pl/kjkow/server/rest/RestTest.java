package pl.kjkow.server.rest;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RestTest {

    @Autowired
    protected TestRestTemplate restTemplate;

    protected HttpHeaders getAuthenticationHeaders(){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "qwerty");
        headers.add("Identification", "123456");
        return headers;
    }
}
