package com.bootcamp.books;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.bootcamp.books.services.BooksDao;
import com.bootcamp.books.services.BooksDaoImpl;
import com.bootcamp.books.services.StudentsDao;
import com.bootcamp.books.services.StudentsDaoImpl;
import com.bootcamp.books.services.TransactionsDao;
import com.bootcamp.books.services.TransactionsDaoImpl;

@Configuration
public class DaoSpringBootConfig {

	@Bean
	public TransactionsDao transaksi() {
		return new TransactionsDaoImpl();
	}

	@Bean
	public BooksDao daoBuku() {
		return new BooksDaoImpl();
	}

	@Bean
	public StudentsDao studentsDao() {
		return new StudentsDaoImpl();
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
}
