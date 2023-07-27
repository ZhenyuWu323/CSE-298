package CSE298.SpringBoot_tutorial.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import CSE298.SpringBoot_tutorial.model.UserInfo;
import CSE298.SpringBoot_tutorial.repository.SessionRepository;
import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    private final SessionRepository SessionMap;
    @Autowired
    public UserController(SessionRepository SessionMap){
        this.SessionMap = SessionMap;
    }
    //Google OAuth
    @GetMapping("/google")
    public UserInfo GoogleLogin(OAuth2AuthenticationToken token){
        if(token == null){
            return null;
        }
        else{
            // Fetch user details from the token attributes
            Map<String, Object> userDetails = token.getPrincipal().getAttributes();

            // Craft a welcome message
            String name = (String) userDetails.get("name");
            String pictureUrl = (String) userDetails.get("picture");
            int val = ThreadLocalRandom.current().nextInt(100_000, 1_000_000);
            String sessionId = String.valueOf(val);

            SessionMap.addOrUpdateSession(name, sessionId);

            // Respond with the welcome message
            return new UserInfo(name, pictureUrl, sessionId);
        }
    }
}
