package com.bootcamp.books.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;

import com.bootcamp.books.enttity.Books;
import com.bootcamp.books.repository.BooksRepository;

public class BooksDaoImpl implements BooksDao {

	@Autowired
	private BooksRepository bookRepository;

	@Override
	public List<Books> getAllBooks() throws Exception {
		List<Books> bookList = bookRepository.findAll();
		try {
			if (bookList.isEmpty()) {
				return null;
			}
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
		return bookList;
	}

	@Override
	public List<Books> getBookListByTitle(@RequestParam("title") String title) throws Exception {
		List<Books> bookList = bookRepository.findByTitleLike("%" + title + "%");
		try {
			if (bookList.isEmpty()) {
				return null;
			}
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
		return bookList;
	}

	@Override
	public List<Books> getBookListByAuthor(@RequestParam("author") String author) throws Exception {
		List<Books> bookList = bookRepository.findByAuthorLike("%" + author + "%");
		try {
			if (bookList.isEmpty()) {
				return null;
			}
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
		return bookList;
	}

	@Override
	public Books getBookByBookId(Integer bookId) throws Exception {
		Books book = bookRepository.findByBookId(bookId);
		try {
			if (book == null) {
				return null;
			}
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
		return book;
	}

	@Override
	public Books addBook(Books bookTmp) throws Exception {
		Books book = bookTmp;
		try {
			if (bookRepository.findById(book.getBookId()).isPresent()) {
				return null;
			} else {
				bookRepository.save(book);
			}
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}

		return book;
	}

	@Override
	public Books updateBookById(Books book) throws Exception {
		Books newBook = new Books();
		try {
			if (bookRepository.findById(book.getBookId()).isPresent()) {
				newBook.setBookId(book.getBookId());
				newBook.setTitle(book.getTitle());
				newBook.setAuthor(book.getAuthor());
				newBook.setPrice(book.getPrice());
				newBook.setStock(book.getStock());
				bookRepository.save(newBook);
				return newBook;
			} else {
				return null;
			}

		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public Boolean deleteBookById(Integer bookId) throws Exception {
		try {
			if (bookRepository.findById(bookId).isPresent()) {
				bookRepository.deleteById(bookId);
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}
	
	public Page<Books> findPaging(int page) throws Exception {
		Pageable pageable = new PageRequest(page, 5);
		Page<Books> paging = bookRepository.findPage(pageable);
		return paging;
	}

}
