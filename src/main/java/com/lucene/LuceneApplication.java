package com.lucene;

import com.lucene.service.luceneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class LuceneApplication implements CommandLineRunner {

    @Autowired
    luceneService luceneService;

    public static void main(String[] args) {
        SpringApplication.run(LuceneApplication.class, args);
    }


    @Override
    public void run(String... args) throws Exception {
          luceneService.createIndex();
          luceneService.search("你和我");
    }
}

