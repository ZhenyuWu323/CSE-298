package CSE298.SpringBoot_tutorial.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "WishList")
public class WishList {
    @Id
    private String id;
    private String username;
    private List<Games> wishlist;

    // Constructor
    public WishList( String username, List<Games> wishlist) {
        this.username = username;
        this.wishlist = wishlist;
    }

    // Getters
    public String getId() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
    }

    public List<Games> getWishlist() {
        return this.wishlist;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setWishlist(List<Games> wishlist) {
        this.wishlist = wishlist;
    }
}