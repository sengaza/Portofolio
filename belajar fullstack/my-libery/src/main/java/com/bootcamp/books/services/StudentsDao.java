package com.bootcamp.books.services;

import java.util.List;

import org.springframework.data.domain.Page;

import com.bootcamp.books.enttity.Students;

public interface StudentsDao {

	List<Students> getAllStudents() throws Exception;
	Students getStudentById(Integer studentId) throws Exception;
	Students addStudent(Students tmpStudent) throws Exception;
	Students updateStudentById(Students student) throws Exception;
	Boolean deleteStudentById(Integer studentId) throws Exception;
	Page<Students> findPaging(int page) throws Exception;
}
