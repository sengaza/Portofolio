import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/model/book';
import { FormmodalComponent } from '../formmodal/formmodal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  book: Book[];
  constructor(private bookService: BookService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.bookService.getAll().subscribe(data => {
      console.log(data);
      this.book = data['data'];
    });
  }

  deleteBook(bookId) {
    this.bookService.deleteBook(bookId).subscribe(data => {
      this.book = Book['data'];
      this.getAll();
    })
  }

  openModal(bookId: number) {
    this.bookService.findByBookId(bookId).subscribe((data) => {
      const modalRef = this.modalService.open(FormmodalComponent, {
        backdrop: 'static', keyboard: false, centered: true
      });
      var book = data['data'];
      modalRef.componentInstance.setBook({
        bookId: book.bookId,
        title: book.title,
        author: book.author,                  
        price: book.price,
        stock: book.stock
      });

      modalRef.result.then(value => {
        if(value == 'reload' ){
          this.getAll();
        }
        console.log("THEN "+ value);
      }).catch(value => {
        console.log('CATH '+ value);
      })
    });

  }

}
