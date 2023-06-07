package CSE298.SpringBoot_tutorial.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import CSE298.SpringBoot_tutorial.model.Games;

@Repository
public class GameRepository {
    private final List<Games> GameList = new ArrayList<>();
    
    public GameRepository(){
    }

    public List<Games> FindAllGames(){
        return GameList;
    }

    public void AddGame(Games game){
        GameList.add(game);
    }

    public void CleanGame(){
        GameList.clear();
    }
}
