package com.bootcamp.books.services;

import java.util.List;

import com.bootcamp.books.dto.TransactionsDto;
import org.springframework.data.domain.Page;

import com.bootcamp.books.enttity.Transactions;

public interface TransactionsDao {

	List<Transactions> getAllTransactions() throws Exception;
	Transactions getTransactionById(String TransactionId) throws Exception;
    Transactions addTransaction(TransactionsDto tmpTrans) throws Exception;

    Transactions updateTransactionById(Transactions Transaction) throws Exception;
	Boolean deleteTransactionById(String TransactionId) throws Exception;
	Page<Transactions> findPaging(int page) throws Exception;
}
