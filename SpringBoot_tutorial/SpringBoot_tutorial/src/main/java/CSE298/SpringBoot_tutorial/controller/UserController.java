package CSE298.SpringBoot_tutorial.controller;

import java.util.Map;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    @Autowired
    private PasswordEncoder passwordEncoder;
    
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
    public ResponseEntity<String> HomeSignUp(@RequestBody UserProfile user) {
        // Check if a UserProfile with the given name already exists in the database
        UserProfile existingUser = UserRepo.findByName(user.getName());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.SC_CONFLICT).body("Duplicate User Name\n");
        } else {
            UserProfile newUser = new UserProfile(user.getName(), user.getPassword(), "none", user.getSalt());
            //UserRepo.deleteAll();
            UserProfile savedUser = UserRepo.save(newUser);
            return ResponseEntity.status(HttpStatus.SC_CREATED).body("New User Signed Up\n");
        }
    }

    public boolean validateUser(String name, String plainPassword) {
        UserProfile user = UserRepo.findByName(name);
        if (user == null) {
            return false; // User not found
        }
        
        String hashedPassword = user.getPassword();
        String salt = user.getSalt();
    
        // Hash the provided plainPassword using the same salt and check if it matches the stored hashed password
        String hashedPlainPassword = passwordEncoder.encode(plainPassword + salt);
        return hashedPassword.equals(hashedPlainPassword);
    }
}
