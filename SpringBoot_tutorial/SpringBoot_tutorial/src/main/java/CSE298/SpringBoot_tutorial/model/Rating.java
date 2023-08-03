package CSE298.SpringBoot_tutorial.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Ratings")
public class Rating {
    @Id
    String id;
    String game;
    String buy;
    String maybe;
    String trash;

    public Rating(String game, String buy, String maybe, String trash) {
        this.game = game;
        this.buy = buy;
        this.maybe = maybe;
        this.trash = trash;
    }

    // Getter methods
    public String getId() {
        return id;
    }

    public String getGame() {
        return game;
    }

    public String getBuy() {
        return buy;
    }

    public String getMaybe() {
        return maybe;
    }

    public String getTrash() {
        return trash;
    }

    // Setter methods
    public void setId(String id) {
        this.id = id;
    }

    public void setGame(String game) {
        this.game = game;
    }

    public void setBuy(String buy) {
        this.buy = buy;
    }

    public void setMaybe(String maybe) {
        this.maybe = maybe;
    }

    public void setTrash(String trash) {
        this.trash = trash;
    }
}
