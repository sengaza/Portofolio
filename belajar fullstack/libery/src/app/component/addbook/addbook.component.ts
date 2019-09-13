import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { Route, Router } from '@angular/router';
import { Book } from 'src/app/model/book';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  book: Book;
  constructor(private bookService: BookService, private route: Router) { 
    this.book = new Book();
  }

  ngOnInit() {
  }

  addBook(book: Book) {
    this.bookService.addBook(book).subscribe(data => {
      this.book = data;
      this.navigate();
    })
  }

  navigate() {
    this.route.navigate(["/home"]);
  }

}
