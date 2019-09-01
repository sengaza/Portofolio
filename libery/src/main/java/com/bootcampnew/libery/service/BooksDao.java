package com.bootcampnew.libery.service;

import java.util.List;

import com.bootcampnew.libery.entity.Books;

public interface BooksDao {
	
	Books updateBooks(int id, Books books)throws Exception;
	
    List<Books> getAllBook() throws Exception;
	
//	Page<Books> findPaging(int page) throws Exception;
	
	Books getBooksById(int bookId) throws Exception;

	void deleteById(int bookId) throws Exception;

	Books findByTitle(String ast) throws Exception;

	Books addBooks( Books insertBooks) throws Exception ;
}
