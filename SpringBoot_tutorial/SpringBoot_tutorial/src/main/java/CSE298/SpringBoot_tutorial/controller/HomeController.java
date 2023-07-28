package CSE298.SpringBoot_tutorial.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    
    @RequestMapping({"/", "/userCenter", "/createAccount","/searchByname/{name}"})
    public String home() {
        return "forward:/index.html";
    }

}