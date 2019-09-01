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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bootcampnew.libery.entity.Students;
import com.bootcampnew.libery.service.StudentsDao;
import com.bootcampnew.libery.util.CommonResponse;
import com.bootcampnew.libery.util.CommonStatus;

@RestController
@RequestMapping
public class StudentsController {
	
	private CommonStatus commonStatus = new CommonStatus();
	ModelMapper modelMapper = new ModelMapper();
	
	private static final String STUDENT_ADDR = "/students";
	private static final String STUDENT_PATH_VARIABLE = STUDENT_ADDR+"/{id}";
	private static final String STUDENT_BY_NAME = STUDENT_ADDR+"/name";

	
	@Autowired
	StudentsDao studentsDao;
	
	
	@GetMapping(STUDENT_ADDR)
	public CommonResponse<List<Students>> getAllStudents() throws Exception {
		List<Students> listStudents = studentsDao.getAllStudents();
		
		CommonResponse<List<Students>> response = new CommonResponse<List<Students>>();
		try {
			if (listStudents == null) {
				commonStatus.setResponseCode("404");
				commonStatus.setResponseDesc("Books not found");
				response.setResponseStatus(commonStatus);
				return response;
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(listStudents);

			}
		} catch (Exception e) {
			e.getMessage();
		}
		return response;
	}
	
	@PostMapping (STUDENT_ADDR)
	public CommonResponse<Students> addStudents(@RequestBody Students insertStudents) throws Exception {
		
		Students students = studentsDao.addStudents(insertStudents);
		
		CommonResponse<Students> response = new CommonResponse<Students>();
		try {
			if (students == null) {
				commonStatus.setResponseCode("409");
				commonStatus.setResponseDesc("Books already exsist");
				response.setResponseStatus(commonStatus);
				return response;
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(students);
			}
		} catch (Exception e) {
			e.getMessage();
		}
		return response;

	}
	
	@DeleteMapping(STUDENT_PATH_VARIABLE)
	public void deleteById(@PathVariable(value = "id") Integer studentId, Students studentsId) throws Exception {
		
		CommonResponse<Students> response = new CommonResponse<Students>();
		try {
			if (studentId == null) {
				commonStatus.setResponseCode("409");
				commonStatus.setResponseDesc("Books already exsist");
				response.setResponseStatus(commonStatus);
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(studentsId);
			}
		} catch (Exception e) {
			e.getMessage();
		}
		studentsDao.deleteById(studentId);
	}

	
	@PutMapping(STUDENT_PATH_VARIABLE)
	public CommonResponse<Students> updateStudents(@PathVariable int id, @RequestBody Students students) {
		CommonResponse<Students> response = new CommonResponse<Students>();
		try {
			if (students == null) {
				commonStatus.setResponseCode("407");
				commonStatus.setResponseDesc("Books Does Not Exist");
				response.setResponseStatus(commonStatus);
				return response;
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(students);
			}
		} catch (Exception e) {
			e.getMessage();
		}
		return response;
	}
	
	@GetMapping(STUDENT_BY_NAME)
	public CommonResponse<Students>  getStudentByName(@RequestParam("name") String ast) throws Exception {
		Students students = studentsDao.findByName(ast);	
		CommonResponse<Students> response = new CommonResponse<Students>();
		try {
			if (students == null) {
				commonStatus.setResponseCode("402");
				commonStatus.setResponseDesc("Title Books Does Not Exist");
				response.setResponseStatus(commonStatus);
				return response;
			} else {
				commonStatus.setResponseCode("200");
				commonStatus.setResponseDesc("Success");
				response.setResponseStatus(commonStatus);
				response.setData(students);
			}
		} catch (Exception e) {
			e.getMessage();
		}
		return response;
	}
}
