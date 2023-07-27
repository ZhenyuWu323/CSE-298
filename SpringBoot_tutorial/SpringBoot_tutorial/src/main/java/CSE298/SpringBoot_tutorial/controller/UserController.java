package CSE298.SpringBoot_tutorial.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class UserController {
    //Google OAuth
    @GetMapping("/google")
    public ResponseEntity<String> GoogleLogin(OAuth2AuthenticationToken token){
        System.out.println(token.getPrincipal().getAttributes());

        // Fetch user details from the token attributes
        Map<String, Object> userDetails = token.getPrincipal().getAttributes();

        // Craft a welcome message
        String welcomeMessage = String.format("Hello, %s! You are logged in successfully.", userDetails.get("name"));

        // Respond with the welcome message
        return ResponseEntity.ok(welcomeMessage);
    }
}
