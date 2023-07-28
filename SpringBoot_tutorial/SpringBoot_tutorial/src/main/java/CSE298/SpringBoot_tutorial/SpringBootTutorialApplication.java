package CSE298.SpringBoot_tutorial;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
//@EnableMongoRepositories(basePackages = "CSE298.SpringBoot_tutorial.repository")
public class SpringBootTutorialApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootTutorialApplication.class, args);
	}

}
