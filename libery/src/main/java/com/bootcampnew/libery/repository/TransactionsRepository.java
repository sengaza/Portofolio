package com.bootcampnew.libery.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcampnew.libery.entity.TransactionsLibery;

public interface TransactionsRepository extends JpaRepository<TransactionsLibery, String> {

}
