import { Component, OnInit, Input } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Book } from 'src/app/model/book';

@Component({
  selector: 'app-formmodal',
  templateUrl: './formmodal.component.html',
  styleUrls: ['./formmodal.component.css']
})
export class FormmodalComponent implements OnInit {

  book: Book;
  form = this.formBuilder.group({
    bookId: [''],
    title: [''],
    author: [''],
    price: [''],
    stock: ['']
  })

  constructor(private bookService: BookService,
    public activeModal: NgbActiveModal, private route: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  setBook(entity) {
    this.form.setValue(entity);
  }

  updateBook() {

    var book = this.form.getRawValue();
    console.log(book);
    this.bookService.updateBook(book).subscribe(data => {
      console.log(data);
      this.activeModal.close('reload');
    });
  }



}
