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
import com.bootcamp.books.enttity.Students;
import com.bootcamp.books.services.StudentsDao;
import com.bootcamp.books.util.CommonResponse;
import com.bootcamp.books.util.CommonStatus;
import com.bootcamp.books.util.JsonUtil;

@RestController
@RequestMapping(path = "/api", produces = "application/json; charset=UTF-8")
public class StudentsController {
	private static final String STUDENTS_ADDR = "/students";
	private static final String STUDENTS_BY_ID_ADDR = STUDENTS_ADDR + "/{studentId}";
	private static final String STUDENTS_PAGE_ADDR = STUDENTS_ADDR + "/page";

	private CommonStatus commonStatus = new CommonStatus();

	@Autowired
	private StudentsDao studentsDao;

	@GetMapping(STUDENTS_ADDR)
	public String getAllStudents() throws Exception {
		List<Students> result = studentsDao.getAllStudents();
		CommonResponse<List<Students>> response = new CommonResponse<List<Students>>();
		try {
			if (result == null) {
				commonStatus.setResponseCode("404");
				commonStatus.setResponseDesc("Students not found");
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

	@GetMapping(STUDENTS_BY_ID_ADDR)
	public String getBookByBookId(@PathVariable("studentId") Integer studentId) throws Exception {
		Students result = studentsDao.getStudentById(studentId);
		CommonResponse<Students> response = new CommonResponse<Students>();
		try {
			if (result == null) {
				commonStatus.setResponseCode("404");
				commonStatus.setResponseDesc("Student not found");
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

	@PostMapping(STUDENTS_ADDR)
	public String addStudent(@RequestBody Students tmpStudent) throws Exception {
		Students result = studentsDao.addStudent(tmpStudent);
		CommonResponse<Students> response = new CommonResponse<Students>();
		try {
			if (result == null) {
				commonStatus.setResponseCode("409");
				commonStatus.setResponseDesc("Students already exsist");
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

	@PutMapping(STUDENTS_ADDR)
	public String updateStudentById(@RequestBody Students student) throws Exception {
		Students result = studentsDao.updateStudentById(student);
		CommonResponse<Students> response = new CommonResponse<Students>();
		try {
			if (result == null) {
				commonStatus.setResponseCode("404");
				commonStatus.setResponseDesc("Students not found");
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

	@DeleteMapping(STUDENTS_BY_ID_ADDR)
	public String deleteStudentById(@PathVariable("studentId") Integer studentId) throws Exception {
		Boolean result = studentsDao.deleteStudentById(studentId);
		CommonResponse<Books> response = new CommonResponse<Books>();
		try {
			if (!result) {
				commonStatus.setResponseCode("404");
				commonStatus.setResponseDesc("Students not found");
				response.setResponseStatus(commonStatus);
				return JsonUtil.generateJson(response);
			} else {
				studentsDao.deleteStudentById(studentId);
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Delete students success");
				response.setResponseStatus(commonStatus);
			}
		} catch (Exception e) {
			e.getMessage();
		}
		return JsonUtil.generateJson(response);
	}

	@GetMapping(STUDENTS_PAGE_ADDR)
	public Page<Students> getPage(@RequestParam(name = "page", defaultValue = "0") int page) throws Exception {
		return studentsDao.findPaging(page);
	}
}
