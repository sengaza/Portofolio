package com.bootcamp.books.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bootcamp.books.enttity.Transactions;

public interface TransactionsRepository extends JpaRepository<Transactions, String> {

	Transactions findByTransactionId(String transactionId);

//	List<Transactions> findByTransactionLike(String transaction);
	@Query(value = "SELECT t FROM Transactions t", countQuery = "SELECT COUNT(t) FROM Transactions t")
	Page<Transactions> findPage(Pageable pageable);
}
