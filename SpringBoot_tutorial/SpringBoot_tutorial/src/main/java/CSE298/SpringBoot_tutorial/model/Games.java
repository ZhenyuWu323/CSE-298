package CSE298.SpringBoot_tutorial.model;

import java.util.List;

public record Games(
    String ID,
    String Name,
    String Image,
    List<String> Genre,
    List<String> Platform,
    String Metacritic,
    String Released
){

}