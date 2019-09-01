package com.bootcampnew.libery.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcampnew.libery.entity.Students;

public interface StudentsRepository extends JpaRepository<Students, Integer> {

	Students findByName(String name);
	Students getStudentById(Integer studentsId); 

}
