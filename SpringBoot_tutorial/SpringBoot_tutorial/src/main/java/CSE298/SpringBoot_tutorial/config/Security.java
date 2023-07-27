package CSE298.SpringBoot_tutorial.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.client.OAuth2LoginConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class Security {
    
    @Bean
    SecurityFilterChain filetChain(HttpSecurity http) throws Exception{
        return http
        .authorizeHttpRequests(
            auth->{
                auth.requestMatchers("/login/google").authenticated();
                auth.anyRequest().permitAll();
            }
        )
        .oauth2Login(withDefaults())
        .build();
    
    }

    

    
}
