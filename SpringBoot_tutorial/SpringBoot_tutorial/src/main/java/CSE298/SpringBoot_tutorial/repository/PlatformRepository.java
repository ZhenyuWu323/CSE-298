package CSE298.SpringBoot_tutorial.repository;


import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import CSE298.SpringBoot_tutorial.model.Platforms;

@Repository
public class PlatformRepository {

    private final List<Platforms> PlatformList = new ArrayList<>();

    public PlatformRepository(){

    }
    
    public List<Platforms> FindAllPlatform(){
        return PlatformList;
    }

    public void AddPlatform(Platforms platform){
        PlatformList.add(platform);
    }

    public void CleanPlatform(){
        PlatformList.clear();
    }
    
}
