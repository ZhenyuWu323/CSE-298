package CSE298.SpringBoot_tutorial.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class UserProfile {
    @Id
    private String id;
    private String name;
    private String password;
    private String profileImage;
    private String salt;

    // Constructor
    public UserProfile( String name, String password, String profileImage,String salt) {
        this.name = name;
        this.password = password;
        this.profileImage = profileImage;
        this.salt = salt;
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public String getSalt(){
        return salt;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    } 
    
    public void setSalt(String salt) {
        this.salt = salt;
    }
}
