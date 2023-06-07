package CSE298.SpringBoot_tutorial.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import CSE298.SpringBoot_tutorial.model.Content;
import CSE298.SpringBoot_tutorial.repository.ContentCollectionRepository;
import jakarta.validation.Valid;

//Handle Request,Return Response
@RestController
@RequestMapping("/api/content")
@CrossOrigin
public class ContentController {

    //Bean Injection
    private final ContentCollectionRepository repository;
    //无需再创ContentCollectionRepository的instance，直接用bean里的
    @Autowired
    public ContentController(ContentCollectionRepository repository){
        this.repository = repository;
    }

    @GetMapping("")
    public List<Content> findAll(){
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Content findById(@PathVariable Integer id){
        return repository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found"));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public void saveContent(@Valid @RequestBody Content c){
        repository.saveContent(c);
    }
    
    
    @PutMapping("/{id}")
    public void updateContent(@Valid @PathVariable Integer id, @Valid @RequestBody Content c){
        if(!repository.existById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found");
        }
        repository.updateContent(c);
    }

    @DeleteMapping("/{id}")
    public void deleteContent(@Valid @PathVariable Integer id){
        if(!repository.existById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found");
        }
        repository.deleteContent(id);
    }
}
