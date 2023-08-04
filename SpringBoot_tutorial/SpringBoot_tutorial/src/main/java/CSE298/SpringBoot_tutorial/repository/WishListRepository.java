package CSE298.SpringBoot_tutorial.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


import CSE298.SpringBoot_tutorial.model.WishList;

@Repository
public interface WishListRepository extends MongoRepository<WishList, String>{
    WishList findByUsername(String username);
}