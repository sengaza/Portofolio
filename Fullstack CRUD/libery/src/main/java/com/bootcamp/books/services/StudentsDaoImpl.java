package com.bootcamp.books.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;

import com.bootcamp.books.enttity.Students;
import com.bootcamp.books.repository.StudentsReporsitory;

public class StudentsDaoImpl implements StudentsDao {

	@Autowired
	private StudentsReporsitory studentsReporsitory;

	@Override
	public List<Students> getAllStudents() throws Exception {
		List<Students> studentList = studentsReporsitory.findAll();
		try {
			if (studentList.isEmpty()) {
				return null;
			}
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
		return studentList;
	}

	@Override
	public Students getStudentById(Integer studentId) throws Exception {
		Students student = studentsReporsitory.findByStudentId(studentId);
		try {
			if (student == null) {
				return null;
			}
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
		return student;
	}

	@Override
	public Students addStudent(@RequestBody Students tmpStudent) throws Exception {
		Students student = tmpStudent;
		try {
			if (studentsReporsitory.findById(student.getStudentId()).isPresent()) {
				return null;
			} else {
				studentsReporsitory.save(student);
			}
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}

		return student;
	}

	@Override
	public Students updateStudentById(Students student) throws Exception {
		Students newStudent = new Students();
		try {
			if (studentsReporsitory.findById(student.getStudentId()).isPresent()) {
				newStudent.setStudentId(student.getStudentId());
				newStudent.setName(student.getName());
				newStudent.setNim(student.getNim());
				studentsReporsitory.save(newStudent);
				return newStudent;
			} else {
				return null;
			}

		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public Boolean deleteStudentById(Integer studentId) throws Exception {
		try {
			if (studentsReporsitory.findById(studentId).isPresent()) {
				studentsReporsitory.deleteById(studentId);
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	public Page<Students> findPaging(int page) throws Exception {
		Pageable pageable = new PageRequest(page, 5);
		Page<Students> paging = studentsReporsitory.findPage(pageable);
		return paging;
	}

}
