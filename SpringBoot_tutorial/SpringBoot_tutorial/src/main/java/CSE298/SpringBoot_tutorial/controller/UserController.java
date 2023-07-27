package CSE298.SpringBoot_tutorial.controller;

import java.util.Map;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import CSE298.SpringBoot_tutorial.model.UserInfo;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    //Google OAuth
    @GetMapping("/google")
    public UserInfo GoogleLogin(OAuth2AuthenticationToken token){
        // Fetch user details from the token attributes
        Map<String, Object> userDetails = token.getPrincipal().getAttributes();

        // Craft a welcome message
        String name = (String) userDetails.get("name");
        String pictureUrl = (String) userDetails.get("picture");

        // Respond with the welcome message
        return new UserInfo(name, pictureUrl);
    }
}
