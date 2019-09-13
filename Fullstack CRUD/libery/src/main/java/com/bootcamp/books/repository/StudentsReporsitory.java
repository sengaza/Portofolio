package com.bootcamp.books.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bootcamp.books.enttity.Students;

public interface StudentsReporsitory extends JpaRepository<Students, Integer> {

	Students findByStudentId(Integer studentId);
	Students findStudentsByName(String name);
	List<Students> findByNameLike(String name);
	@Query(value = "SELECT s FROM Students s",
			countQuery = "SELECT COUNT(s) FROM Students s")
	Page<Students> findPage(Pageable pageable);
}
