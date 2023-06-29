package CSE298.SpringBoot_tutorial.model;

import java.util.List;

public record Games(
    String id,
    String name,
    String image,
    List<String> genre,
    List<String> platform,
    String metacritic,
    String released
){

}