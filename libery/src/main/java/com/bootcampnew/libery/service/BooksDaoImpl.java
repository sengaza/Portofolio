package com.bootcampnew.libery.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.bootcampnew.libery.entity.Books;
import com.bootcampnew.libery.repository.BooksRepository;

public class BooksDaoImpl implements BooksDao{
	
	@Autowired
	BooksRepository booksRepository;

	@Override 
	public Books updateBooks(int id, Books books) {
		
		Books update = new Books();
		update = books;
		update.getId();
		update.getTitle();
		update.getPublisher();
		update.getPrice();
		update.getStock();
		
		return booksRepository.save(update);
	}

	@Override
	public List<Books> getAllBook() throws Exception {
		return booksRepository.findAll();
	}

	@Override
	public Books addBooks(Books insertBooks) throws Exception {
		return booksRepository.save(insertBooks);
	}

//	@Override
//	public Page<Books> findPaging(int page) throws Exception {
//		PageRequest pageable = new PageRequest(page, 5);
//		Page<Books> paging = booksRepository.findPage(pageable);
//		
//		return paging;
//	}

	@Override
	public void deleteById(int bookId) throws Exception {
		booksRepository.deleteById(bookId);
		
	}

	@Override
	public Books getBooksById(int bookId) throws Exception {
		
		return booksRepository.getBooksById(bookId);
	}

	@Override
	public Books findByTitle(String ast) {
		
		return booksRepository.findBooksByTitle(ast);
	}

	

}
