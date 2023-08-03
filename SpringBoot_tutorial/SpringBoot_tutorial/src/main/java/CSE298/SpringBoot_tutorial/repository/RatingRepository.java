package CSE298.SpringBoot_tutorial.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import CSE298.SpringBoot_tutorial.model.Rating;

@Repository
public interface RatingRepository extends MongoRepository<Rating, String>{
    Rating findByGame(String game);
}
