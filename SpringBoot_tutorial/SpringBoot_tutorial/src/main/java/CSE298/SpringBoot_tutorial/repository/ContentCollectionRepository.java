package CSE298.SpringBoot_tutorial.repository;

import java.sql.Array;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import CSE298.SpringBoot_tutorial.model.Content;
import CSE298.SpringBoot_tutorial.model.Status;
import CSE298.SpringBoot_tutorial.model.Type;
import jakarta.annotation.PostConstruct;
import jakarta.security.auth.message.MessagePolicy.Target;

import org.springframework.stereotype.Repository;

@Repository
public class ContentCollectionRepository {
    
    private final List<Content> content = new ArrayList<>();

    public ContentCollectionRepository(){
    }

    public List<Content> findAll(){
        return content;
    }

    public Optional<Content> findById(Integer id){
        return content.stream().filter(c -> c.id().equals(id)).findFirst();
    }

    public void saveContent(Content c){
        content.add(c);
    }

    public boolean existById(Integer id){
        return content.stream().filter(c -> c.id().equals(id)).count()==1;
    }

    public void updateContent(Content c){
        int target_id = c.id();
        int target_ind = 0;
        for(int i = 0; i < content.size(); i++){
            if(content.get(i).id() == target_id){
                target_ind = i;
                break;
            }
        }
        content.remove(target_ind);
        content.add(c);
    }

    public void deleteContent(Integer id){
        int target_ind = 0;
        for(int i = 0; i < content.size(); i++){
            if(content.get(i).id() == id){
                target_ind = i;
                break;
            }
        }
        content.remove(target_ind);
    }

    

    //用于Bean Injection 之后修改内容
    @PostConstruct
    private void init(){
        Content c = new Content(1, "1st test", "1st test", Status.COMPLETED, Type.ARTICLE, LocalDateTime.now(), null, "");
        content.add(c);
    }
}
