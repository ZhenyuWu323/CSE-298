package CSE298.SpringBoot_tutorial.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Comments")
public record Comment(
    @Id
    String id,
    String game,
    String userName,
    String userImage,
    String time,
    String content
) {
    
}
