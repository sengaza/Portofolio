package com.bootcamp.books.enttity;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table
public class Transactions {
	@Id
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	@GeneratedValue(generator = "uuid2")
	private String transactionId;
	@JsonFormat(pattern = "dd-MM-yyyy")
	private Date borrowDate;
	@JsonFormat(pattern = "dd-MM-yyyy")
	private Date returnDate;
	private double price;
	private String status;

	@OneToOne
	@JoinColumn(name = "bookId")
	private Books idBuku;

	@OneToOne
	@JoinColumn(name = "studentId")
	private Students studentId;

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public Date getBorrowDate() {
		return borrowDate;
	}

	public void setBorrowDate(Date borrowDate) {
		this.borrowDate = borrowDate;
	}

	public Date getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(Date returnDate) {
		this.returnDate = returnDate;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Books getIdBuku() {
		return idBuku;
	}

	public void setIdBuku(Books idBuku) {
		this.idBuku = idBuku;
	}

	public Students getStudentId() {
		return studentId;
	}

	public void setStudentId(Students studentId) {
		this.studentId = studentId;
	}

}
