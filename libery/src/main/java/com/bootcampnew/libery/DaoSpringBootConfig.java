package com.bootcampnew.libery;

import org.springframework.context.annotation.Bean;

import com.bootcampnew.libery.service.BooksDao;
import com.bootcampnew.libery.service.BooksDaoImpl;
import com.bootcampnew.libery.service.StudentsDao;
import com.bootcampnew.libery.service.StudentsDaoImpl;
import com.bootcampnew.libery.service.TransactionLiberyDao;
import com.bootcampnew.libery.service.TransactionLiberyDaoImpl;

public class DaoSpringBootConfig {
	
	@Bean
	public BooksDao booksDao() {
		return new BooksDaoImpl();
	}
	
	@Bean
	public StudentsDao studentsDao() {
		return new StudentsDaoImpl();
	}

	@Bean
	public TransactionLiberyDao transactionLiberyDao() {
		return new TransactionLiberyDaoImpl();
	}
}
