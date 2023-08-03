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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import CSE298.SpringBoot_tutorial.model.Comment;
import CSE298.SpringBoot_tutorial.model.Rating;
import CSE298.SpringBoot_tutorial.model.UserInfo;
import CSE298.SpringBoot_tutorial.model.UserProfile;
import CSE298.SpringBoot_tutorial.repository.CommentRepository;
import CSE298.SpringBoot_tutorial.repository.RatingRepository;
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
    @Autowired
    private RatingRepository RatingRepo;

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

    @GetMapping("/findRating")
    public Rating findRating (@RequestParam String game) {
        Rating res = RatingRepo.findByGame(game);
        if(res == null){
            Rating temp = new Rating(game, "0", "0", "0");
            RatingRepo.save(temp);
            return temp;
        }
        else{
            return res;
        }
    }

    @PutMapping("/putRating")
    public ResponseEntity<String> putRating(@RequestParam String game, @RequestParam String which) {
        Rating rating = RatingRepo.findByGame(game);
        if (rating != null) {
            switch(which) {
                case "buy":
                    rating.setBuy(String.valueOf(Integer.parseInt(rating.getBuy()) + 1));
                    break;
                case "maybe":
                    rating.setMaybe(String.valueOf(Integer.parseInt(rating.getMaybe()) + 1));
                    break;
                case "trash":
                    rating.setTrash(String.valueOf(Integer.parseInt(rating.getTrash()) + 1));
                    break;
            }
            RatingRepo.save(rating);
            return ResponseEntity.status(HttpStatus.SC_OK).body("Rate Success\n");
        }
        else{
            Rating temp = new Rating(game, "0", "0", "0");
            switch(which) {
                case "buy":
                    temp.setBuy(String.valueOf(Integer.parseInt(temp.getBuy()) + 1));
                    break;
                case "maybe":
                    temp.setMaybe(String.valueOf(Integer.parseInt(temp.getMaybe()) + 1));
                    break;
                case "trash":
                    temp.setTrash(String.valueOf(Integer.parseInt(temp.getTrash()) + 1));
                    break;
            }
            RatingRepo.save(temp);
            return ResponseEntity.status(HttpStatus.SC_OK).body("Rate Success\n");
        }
        
    }
}
