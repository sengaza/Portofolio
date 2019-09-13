package com.bootcamp.books.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Date;

public class TransactionsDto {
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date borrowDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date returnDate;
    private double price;
    private String status;
    private String bookTitle;
    private String studentName;
    private int booksQty;

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

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public int getBooksQty() {
        return booksQty;
    }

    public void setBooksQty(int booksQty) {
        this.booksQty = booksQty;
    }
}
