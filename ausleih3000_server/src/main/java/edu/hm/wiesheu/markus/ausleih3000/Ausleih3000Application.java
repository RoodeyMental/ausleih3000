package edu.hm.wiesheu.markus.ausleih3000;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Ausleih3000Application {

    public static void main(String[] args) {
        SpringApplication.run(Ausleih3000Application.class, args);
    }

}
