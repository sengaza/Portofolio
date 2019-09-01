package com.bootcampnew.libery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Configuration
@Import({DaoSpringBootConfig.class})
public class LiberyApplication {

	public static void main(String[] args) {
		SpringApplication.run(LiberyApplication.class, args);
	}

}
