package CSE298.SpringBoot_tutorial.model;

import java.util.List;

public record GameDetail(
    String name,
    String description,
    String webpage,
    String image,
    List<String> tag,
    List<GameStores> stores,
    List<String> genre,
    List<String> platform,
    String metacritic,
    String released
){

}