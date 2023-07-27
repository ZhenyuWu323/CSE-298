package CSE298.SpringBoot_tutorial.controller;

import java.util.Map;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class UserController {
    //Google OAuth
    @GetMapping("/goole")
    public Map<String, Object> GoogleLogin(OAuth2AuthenticationToken token){
        System.out.println(token.getPrincipal().getAttributes());
        return token.getPrincipal().getAttributes();
    }
}
