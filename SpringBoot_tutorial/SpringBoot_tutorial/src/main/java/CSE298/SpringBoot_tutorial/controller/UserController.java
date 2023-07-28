package CSE298.SpringBoot_tutorial.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import CSE298.SpringBoot_tutorial.model.UserInfo;
import CSE298.SpringBoot_tutorial.model.UserProfile;
import CSE298.SpringBoot_tutorial.repository.SessionRepository;
import CSE298.SpringBoot_tutorial.repository.UserRepository;

import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/user")
@CrossOrigin
@EnableMongoRepositories(basePackages = "CSE298.SpringBoot_tutorial.repository")
public class UserController {
    @Autowired
    private SessionRepository SessionMap;
    @Autowired
    private UserRepository UserRepo;
    
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

    //HomeRun Signup
    @PostMapping("/homesign")
    public UserProfile HomeSignUp(@RequestParam("name") String name, @RequestParam("pass") String pass) {
        // Check if a UserProfile with the given name already exists in the database
        UserProfile existingUser = UserRepo.findByName(name);
        if (existingUser != null) {
            // If the user already exists, return an error response to the frontend
            //return ResponseEntity.status(HttpStatus.SC_CONFLICT).body("Duplicate User Name\n");
            return null;
        } else {
            // If the user doesn't exist, create a new UserProfile and save it in the database
            UserProfile newUser = new UserProfile(name, pass, "none");
            UserProfile savedUser = UserRepo.save(newUser);
            // You can perform other actions or return a success response if needed.
            //return ResponseEntity.status(HttpStatus.SC_CREATED).body("New User Signed Up\n");
            return savedUser;
        }
    }
}
