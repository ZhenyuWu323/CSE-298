package CSE298.SpringBoot_tutorial.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import CSE298.SpringBoot_tutorial.model.Genre;

@Repository
public class GenreRepository {
    private final List<Genre> GenreList = new ArrayList<>();

    public GenreRepository(){

    }
    
    public List<Genre> FindAllGenre(){
        return GenreList;
    }

    public void AddGenre(Genre genre){
        GenreList.add(genre);
    }

    public void CleanGenre(){
        GenreList.clear();
    }
}
