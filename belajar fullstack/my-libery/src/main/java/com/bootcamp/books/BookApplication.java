package com.bootcamp.books;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@Configuration
@Import({ DaoSpringBootConfig.class })
@EnableJpaRepositories({ "com.bootcamp.books.repository" })
@EntityScan({ "com.bootcamp.books.enttity" })
@ComponentScan({ "com.bootcamp.books.controller" })
public class BookApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(BookApplication.class, args);
	}
}