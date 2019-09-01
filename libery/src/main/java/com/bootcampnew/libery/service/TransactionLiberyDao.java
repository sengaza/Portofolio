package com.bootcampnew.libery.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.bootcampnew.libery.entity.TransactionsLibery;


public interface TransactionLiberyDao{
	
	TransactionsLibery updateTransactionsLibery(int id, TransactionsLibery transactionsLibery);
	
    List<TransactionsLibery> getAllTransaction() throws Exception;
	
	TransactionsLibery addTransactionsLibery(TransactionsLibery insertTransactionsLibery) throws Exception;
	
	Page<TransactionsLibery> findPaging(int page) throws Exception;
	
	void delete(TransactionsLibery transactionsLibery) throws Exception;

	TransactionsLibery getTransactionsLiberysById(Long transactionId) throws Exception;

}
