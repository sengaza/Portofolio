package com.bootcampnew.libery.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import com.bootcampnew.libery.entity.Students;
import com.bootcampnew.libery.repository.StudentsRepository;

public class StudentsDaoImpl implements StudentsDao {

	
	@Autowired
	private StudentsRepository studentsRepository;

	@Override
	public List<Students> getAllStudents() {
		
		return studentsRepository.findAll();
	}

	@Override
	public Students save(Students students) {
		
		return studentsRepository.save(students);
	}

	@Override
	public Students updateStudents(int id, Students students) {

		Students update = new Students();
		update = students;
		update.getId();
		update.setName(update.getName());
		update.setNim(update.getNim());
		
		
		return studentsRepository.save(update);
	}
	
	@Override
	public Students addStudents(Students addStudendts) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Students> findPaging(int page) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Students getStudentById(Integer studentsId) throws Exception {
		
		return studentsRepository.getStudentById(studentsId);
	}

	@Override
	public Students findByName(String name) throws Exception {
		
		return studentsRepository.findByName(name);
	}

	@Override
	public void deleteById(Integer studentId) throws Exception {
		studentsRepository.deleteById(studentId);
		
	}

}
