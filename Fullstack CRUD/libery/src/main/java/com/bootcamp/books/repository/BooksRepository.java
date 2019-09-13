package com.bootcamp.books.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bootcamp.books.enttity.Books;

public interface BooksRepository extends JpaRepository<Books, Integer> {

	Books findByTitle(String title);
	Books findByAuthor(String author);
	Books findByBookId(int bookId);
	List<Books> findByTitleLike(String title);
	List<Books> findByAuthorLike(String author);

	@Query(value = "SELECT b FROM Books b",
			countQuery = "SELECT COUNT(b) FROM Books b")
	Page<Books> findPage(Pageable pageable);

//	@Query("Select a from Buku a where a.judul like %:judul%")
//	List<Buku> findByJudulPercent(@Param("judul") String judul);
//	@Query("Select a from Buku a where a.penerbit like %:penerbit%")
//	List<Buku> findByPenerbitPercent(@Param("penerbit") String penerbit);

}