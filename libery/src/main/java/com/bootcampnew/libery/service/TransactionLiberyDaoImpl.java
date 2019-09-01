package com.bootcampnew.libery.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.bootcampnew.libery.entity.TransactionsLibery;
import com.bootcampnew.libery.repository.TransactionsRepository;

public class TransactionLiberyDaoImpl implements TransactionLiberyDao {
	
	TransactionsLibery transactionsLibery;
	TransactionsRepository transactionsRepository;

	@Override
	public TransactionsLibery updateTransactionsLibery(int id, TransactionsLibery transactionsLibery) {
		
		TransactionsLibery update = new TransactionsLibery();
		update = transactionsLibery;
		update.getId();
		update.setIdStudent(transactionsLibery.getIdStudent());
		update.setIdBook(transactionsLibery.getIdBook());
		update.setBorrowedDate(transactionsLibery.getBorrowedDate());
		update.setReturnDate(transactionsLibery.getReturnDate());
		update.setFined(transactionsLibery.getFined());
		update.setStatus(transactionsLibery.getStatus());
		return update;
	}

	@Override
	public List<TransactionsLibery> getAllTransaction() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TransactionsLibery addTransactionsLibery(TransactionsLibery insertTransactionsLibery) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<TransactionsLibery> findPaging(int page) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(TransactionsLibery transactionsLibery) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public TransactionsLibery getTransactionsLiberysById(Long transactionId) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
