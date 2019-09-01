package com.bootcampnew.libery.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcampnew.libery.entity.Books;
import com.bootcampnew.libery.service.BooksDao;
import com.bootcampnew.libery.util.CommonResponse;
import com.bootcampnew.libery.util.CommonStatus;

@RestController
@RequestMapping
public class BooksController {

	private CommonStatus commonStatus = new CommonStatus();
	ModelMapper modelMapper = new ModelMapper();
	
	/*
	 * Constans
	 */
	private static final String BOOKS_ADDR = "/books";
	private static final String BOOKS_PATH_VARIABLE = BOOKS_ADDR+"/{id}";
	private static final String BOOKS_BY_TITLE = BOOKS_ADDR+"/title";
//	private static final String BOOKS_PAGE_ADDR = "/page";
	
	@Autowired
	BooksDao booksDao;

	@GetMapping(BOOKS_ADDR)
	public CommonResponse<List<Books>> getAllBooks() throws Exception {
		List<Books> listBooks = booksDao.getAllBook();
		CommonResponse<List<Books>> response = new CommonResponse<List<Books>>();
		try {
			if (listBooks == null) {
				commonStatus.setResponseCode("404");
				commonStatus.setResponseDesc("Books not found");
				response.setResponseStatus(commonStatus);
				return response;
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(listBooks);

			}
		} catch (Exception e) {
			e.getMessage();
		}
		return response;

		//return listBooks.stream().map(books -> modelMapper.map(books, BooksDto.class)).collect(Collectors.toList());
	}
	@PostMapping(BOOKS_ADDR)
	public CommonResponse<Books> addBooks(@RequestBody Books insertBooks)throws Exception {
		
		Books books = booksDao.addBooks(insertBooks);
		
		CommonResponse<Books> response = new CommonResponse<Books>();
		try {
			if (books == null) {
				commonStatus.setResponseCode("409");
				commonStatus.setResponseDesc("Books already exsist");
				response.setResponseStatus(commonStatus);
				return response;
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(books);
			}
		} catch (Exception e) {
			e.getMessage();
		}
		return response;


//		return booksDao.save(insertBooks);
	}

	@PutMapping(BOOKS_PATH_VARIABLE)
	public CommonResponse<Books>  updateBooks(@PathVariable int id, @RequestBody Books books) throws Exception {
		CommonResponse<Books> response = new CommonResponse<Books>();
		try {
			if (books == null) {
				commonStatus.setResponseCode("407");
				commonStatus.setResponseDesc("Books Does Not Exist");
				response.setResponseStatus(commonStatus);
				return response;
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(books);
			}
		} catch (Exception e) {
			e.getMessage();
		}
		return response;
		
//		return booksDao.updateBooks(id, books);
	}

	@DeleteMapping(BOOKS_PATH_VARIABLE)
	public void deleteById(@PathVariable(value = "id") Integer bookId, Books Id) throws Exception {
		
		CommonResponse<Books> response = new CommonResponse<Books>();
		try {
			if (Id == null) {
				commonStatus.setResponseCode("409");
				commonStatus.setResponseDesc("Books already exsist");
				response.setResponseStatus(commonStatus);
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(Id);
			}
		} catch (Exception e) {
			e.getMessage();
		}

		booksDao.deleteById(bookId);
	}

	@GetMapping(BOOKS_PATH_VARIABLE)
	public CommonResponse<Books> getBooksById(@PathVariable(value = "id") Integer bookId) throws Exception {
		Books books = booksDao.getBooksById(bookId);
		
		CommonResponse<Books> response = new CommonResponse<Books>();
		try {
			if (books == null) {
				commonStatus.setResponseCode("406");
				commonStatus.setResponseDesc("ID Books Does Not Exist");
				response.setResponseStatus(commonStatus);
				return response;
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(books);
			}
		} catch (Exception e) {
			e.getMessage();
		}
		return response;

//		return modelMapper.map(books, BooksDto.class);
	}
	
	@GetMapping(BOOKS_BY_TITLE)
	public CommonResponse<Books>  getBookByTitle(@PathVariable("title") String ast) throws Exception {
	Books books = booksDao.findByTitle(ast);	
	CommonResponse<Books> response = new CommonResponse<Books>();
	try {
		if (books == null) {
			commonStatus.setResponseCode("402");
			commonStatus.setResponseDesc("Title Books Does Not Exist");
			response.setResponseStatus(commonStatus);
			return response;
		} else {
			commonStatus.setResponseCode("200");
			commonStatus.setResponseDesc("Success");
			response.setResponseStatus(commonStatus);
			response.setData(books);
		}
	} catch (Exception e) {
		e.getMessage();
	}
	return response;

//	return modelMapper.map(books, BooksDto.class);
	}
	
//	@GetMapping("/page")
//	public Page<Books> getPage(@RequestParam(name = "page", defaultValue = "0") int page) throws Exception {
//		return booksDao.findPaging(page);
//
//	}

}
