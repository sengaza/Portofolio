package com.bootcamp.books.services;

import java.util.List;

import com.bootcamp.books.dto.TransactionsDto;
import com.bootcamp.books.enttity.Books;
import com.bootcamp.books.enttity.Students;
import com.bootcamp.books.repository.BooksRepository;
import com.bootcamp.books.repository.StudentsReporsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.bootcamp.books.enttity.Transactions;
import com.bootcamp.books.repository.TransactionsRepository;
import org.springframework.transaction.annotation.Transactional;

public class TransactionsDaoImpl implements TransactionsDao {

    @Autowired
    private TransactionsRepository transRepo;

    @Autowired
    private BooksRepository booksRepository;

    @Autowired
    private StudentsReporsitory studentsReporsitory;

    @Override
    public List<Transactions> getAllTransactions() throws Exception {
        List<Transactions> transList = transRepo.findAll();
        try {
            if (transList.isEmpty()) {
                return null;
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
        return transList;
    }

    @Override
    public Transactions getTransactionById(String transactionId) throws Exception {
        Transactions transaction = transRepo.findByTransactionId(transactionId);
        try {
            if (transaction == null) {
                return null;
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
        return transaction;
    }

    @Transactional
    @Override
    public Transactions addTransaction(TransactionsDto tmpTrans) throws Exception {
        Students students = studentsReporsitory.findStudentsByName(tmpTrans.getStudentName());
        Books book = booksRepository.findByTitle(tmpTrans.getBookTitle());
        Transactions newTrx = new Transactions();
        try {
            if (book == null) {
                throw new Exception("Sorry, book with title : " + tmpTrans.getBookTitle() + " not found");
            } else if (book.getStock() <= 0) {
                throw new Exception("Sorry, we're out of stock");
            } else if (students == null) {
                throw new Exception("Sorry, student with name : " + tmpTrans.getStudentName() + " not found");
            }
            book.setStock(book.getStock() - tmpTrans.getBooksQty());
            newTrx.setIdBuku(book);
            newTrx.setStudentId(students);
            newTrx.setBorrowDate(tmpTrans.getBorrowDate());
            newTrx.setReturnDate(tmpTrans.getReturnDate());
            newTrx.setPrice(tmpTrans.getPrice());
            newTrx.setStatus("Borrowed");
            transRepo.save(newTrx);
            return newTrx;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Transactions updateTransactionById(Transactions transaction) throws Exception {
        Transactions newTrans = new Transactions();
        try {
            if (transRepo.findById(transaction.getTransactionId()).isPresent()) {
                newTrans.setTransactionId(transaction.getTransactionId());
                newTrans.setStatus(transaction.getStatus());
                newTrans.setBorrowDate(transaction.getBorrowDate());
                newTrans.setReturnDate(transaction.getReturnDate());
                transRepo.save(newTrans);
                return newTrans;
            } else {
                return null;
            }

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Boolean deleteTransactionById(String transactionId) throws Exception {
        try {
            if (transRepo.findById(transactionId).isPresent()) {
                transRepo.deleteById(transactionId);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Page<Transactions> findPaging(int page) throws Exception {
        Pageable pageable = new PageRequest(page, 5);
        Page<Transactions> paging = transRepo.findPage(pageable);
        return paging;
    }

}
