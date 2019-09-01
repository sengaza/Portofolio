package com.bootcampnew.libery.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.bootcampnew.libery.entity.Students;

public interface StudentsDao {




	Students save(Students students);

	Students updateStudents(int id, Students students);
	
	
	List<Students> getAllStudents() throws Exception;
	
	Students addStudents(Students addStudendts) throws Exception;
	
	Page<Students> findPaging(int page) throws Exception;
	
	Students getStudentById(Integer studentsId) throws Exception;

	Students findByName(String ast)throws Exception;

	void deleteById(Integer studentId) throws Exception;	

}
