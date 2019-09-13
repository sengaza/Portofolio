package com.bootcamp.books.services;

import java.util.List;

import org.springframework.data.domain.Page;

import com.bootcamp.books.enttity.Books;

public interface BooksDao {

	List<Books> getAllBooks() throws Exception;
	Books getBookByBookId(Integer bookId) throws Exception;
	List<Books> getBookListByTitle(String title) throws Exception;
	List<Books> getBookListByAuthor(String author) throws Exception;
	Books addBook(Books tmpBuku) throws Exception;
	Books updateBookById(Books book) throws Exception;
	Boolean deleteBookById(Integer bookId) throws Exception;
	Page<Books> findPaging(int page) throws Exception;
}
