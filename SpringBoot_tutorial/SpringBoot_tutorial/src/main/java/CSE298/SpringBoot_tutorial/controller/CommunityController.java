package CSE298.SpringBoot_tutorial.controller;
import java.util.List;
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

import CSE298.SpringBoot_tutorial.model.Comment;
import CSE298.SpringBoot_tutorial.model.UserInfo;
import CSE298.SpringBoot_tutorial.model.UserProfile;
import CSE298.SpringBoot_tutorial.repository.CommentRepository;
import CSE298.SpringBoot_tutorial.repository.SessionRepository;
import CSE298.SpringBoot_tutorial.repository.UserRepository;

import java.util.concurrent.ThreadLocalRandom;

@RestController
@RequestMapping("/community")
@CrossOrigin
@EnableMongoRepositories
public class CommunityController {
    @Autowired
    private CommentRepository CommentRepo;

    @GetMapping("/findComment")
    public List<Comment> findComment (@RequestParam String game) {
        List<Comment> res = CommentRepo.findByGame(game);
        return res;
    }

    @PostMapping("/postComment")
    public ResponseEntity<String> postComment(@RequestBody Comment comment) {
        CommentRepo.save(comment);
        return ResponseEntity.status(HttpStatus.SC_CREATED).body("New Comment made\n");
    }
}
