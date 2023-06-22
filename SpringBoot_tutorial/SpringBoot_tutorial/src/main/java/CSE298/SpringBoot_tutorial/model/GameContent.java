package CSE298.SpringBoot_tutorial.model;

import java.util.List;

public record GameContent(
    Integer TotalPage,
    List<Games> GameList
){

}