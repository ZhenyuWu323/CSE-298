package CSE298.SpringBoot_tutorial.model;


import jakarta.validation.constraints.NotEmpty;
public record Games(
    Integer ID,
    String Name
){

}