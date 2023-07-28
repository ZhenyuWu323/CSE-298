package CSE298.SpringBoot_tutorial.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import CSE298.SpringBoot_tutorial.model.UserProfile;
@Repository
public interface UserRepository extends MongoRepository<UserProfile, String>{
    UserProfile findByName(String name);
}
