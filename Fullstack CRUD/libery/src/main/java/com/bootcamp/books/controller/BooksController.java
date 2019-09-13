package com.bootcamp.books.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.books.enttity.Books;
import com.bootcamp.books.services.BooksDao;
import com.bootcamp.books.util.CommonResponse;
import com.bootcamp.books.util.CommonStatus;
import com.bootcamp.books.util.JsonUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api", produces = "application/json; charset=UTF-8")
public class BooksController {

	private static final String BOOKS_ADDR = "/books";
	private static final String BOOKS_BY_ID_ADDR = BOOKS_ADDR + "/{bookId}";
	private static final String BOOKS_BY_TITLE_ADDR = BOOKS_ADDR + "/title";
	private static final String BOOKS_BY_AUTHOR_ADDR = BOOKS_ADDR + "/author";
	private static final String BOOKS_PAGE_ADDR = BOOKS_ADDR + "/page";

	private CommonStatus commonStatus = new CommonStatus();

	@Autowired
	private BooksDao booksDao;

	@GetMapping(BOOKS_ADDR)
	public String getAllBooks() throws Exception {
		List<Books> result = booksDao.getAllBooks();
		CommonResponse<List<Books>> response = new CommonResponse<List<Books>>();
		try {
			if (result == null) {
				commonStatus.setResponseCode("404");
				commonStatus.setResponseDesc("Books not found");
				response.setResponseStatus(commonStatus);
				return JsonUtil.generateJson(response);
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(result);

			}
		} catch (Exception e) {
			e.getMessage();
		}
		return JsonUtil.generateJson(response);
	}

	@GetMapping(BOOKS_BY_TITLE_ADDR)
	public String getBookListByTitle(@RequestParam("title") String title) throws Exception {
		List<Books> result = booksDao.getBookListByTitle(title);
		CommonResponse<List<Books>> response = new CommonResponse<List<Books>>();
		try {
			if (result == null) {
				commonStatus.setResponseCode("404");
				commonStatus.setResponseDesc("Books not found");
				response.setResponseStatus(commonStatus);
				return JsonUtil.generateJson(response);
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(result);

			}
		} catch (Exception e) {
			e.getMessage();
		}
		return JsonUtil.generateJson(response);

	}

	@GetMapping(BOOKS_BY_AUTHOR_ADDR)
	public String getBookListByAuthor(@RequestParam("author") String author) throws Exception {
		List<Books> result = booksDao.getBookListByAuthor(author);
		CommonResponse<List<Books>> response = new CommonResponse<List<Books>>();
		try {
			if (result == null) {
				commonStatus.setResponseCode("404");
				commonStatus.setResponseDesc("Books not found");
				response.setResponseStatus(commonStatus);
				return JsonUtil.generateJson(response);
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(result);

			}
		} catch (Exception e) {
			e.getMessage();
		}
		return JsonUtil.generateJson(response);
	}

	@GetMapping(BOOKS_BY_ID_ADDR)
	public String getBookByBookId(@PathVariable("bookId") int bookId) throws Exception {
		Books result = booksDao.getBookByBookId(bookId);
		CommonResponse<Books> response = new CommonResponse<Books>();
		try {
			if (result == null) {
				commonStatus.setResponseCode("404");
				commonStatus.setResponseDesc("Books not found");
				response.setResponseStatus(commonStatus);
				return JsonUtil.generateJson(response);
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(result);
			}
		} catch (Exception e) {
			e.getMessage();
		}
		return JsonUtil.generateJson(response);
	}

	@PostMapping(BOOKS_ADDR)
	public String addBook(@RequestBody Books tmpBuku) throws Exception {
		Books result = booksDao.addBook(tmpBuku);
		CommonResponse<Books> response = new CommonResponse<Books>();
		try {
			if (result == null) {
				commonStatus.setResponseCode("409");
				commonStatus.setResponseDesc("Books already exsist");
				response.setResponseStatus(commonStatus);
				return JsonUtil.generateJson(response);
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(result);
			}
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}

		return JsonUtil.generateJson(response);
	}

	@PutMapping(BOOKS_ADDR)
	public String updateBookById(@RequestBody Books buku) throws Exception {
		Books result = booksDao.updateBookById(buku);
		CommonResponse<Books> response = new CommonResponse<Books>();
		try {
			if (result == null) {
				commonStatus.setResponseCode("404");
				commonStatus.setResponseDesc("Books not found");
				response.setResponseStatus(commonStatus);
				return JsonUtil.generateJson(response);
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(result);
			}
		} catch (Exception e) {
			e.getMessage();
		}
		return JsonUtil.generateJson(response);
	}
	@CrossOrigin(origins = "*")
	@DeleteMapping(BOOKS_BY_ID_ADDR)
	public String deleteBookById(@PathVariable("bookId") Integer bookId) throws Exception {
		Boolean result = booksDao.deleteBookById(bookId);
		CommonResponse<Books> response = new CommonResponse<Books>();
		try {
			if (!result) {
				commonStatus.setResponseCode("404");
				commonStatus.setResponseDesc("Books not found");
				response.setResponseStatus(commonStatus);
				return JsonUtil.generateJson(response);
			} else {
				booksDao.deleteBookById(bookId);
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Delete book success");
				response.setResponseStatus(commonStatus);
			}
		} catch (Exception e) {
			e.getMessage();
		}
		return JsonUtil.generateJson(response);
	}
	
	@GetMapping(BOOKS_PAGE_ADDR)
	public Page<Books> getPage(@RequestParam(name = "page", defaultValue = "0") int page) throws Exception {
		return booksDao.findPaging(page);
	}
}
