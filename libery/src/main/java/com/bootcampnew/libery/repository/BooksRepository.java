package com.bootcampnew.libery.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcampnew.libery.entity.Books;

public interface BooksRepository extends JpaRepository<Books, Integer> {

	Page<Books> findPaging = null;
	Books getBooksById(Integer bookId);
	Books findBooksByTitle(String title);
	
//	@Query(value = "SELECT u FROM Books U",
//			countQuery ="SELECT COUNT (u) FROM BooksEntity u")
//	Page<Books> findPage(Pageable pageable);
}
