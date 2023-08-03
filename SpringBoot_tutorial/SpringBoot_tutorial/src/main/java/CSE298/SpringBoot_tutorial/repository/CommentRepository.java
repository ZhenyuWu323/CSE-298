package CSE298.SpringBoot_tutorial.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import CSE298.SpringBoot_tutorial.model.Comment;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String>{
    List<Comment> findByGame(String game);
}
