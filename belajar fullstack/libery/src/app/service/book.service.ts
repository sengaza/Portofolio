import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  
  constructor(private http: HttpClient) { }

  url = "http://localhost:2727/api/books/";

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
  }

  deleteBook(bookId: Number): Observable<Book> {
    return this.http.delete<Book>(this.url + bookId);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.url, book);
  }
  
  findByBookId(bookId : number){
    return this.http.get(this.url + bookId);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(this.url, book);
  }
}
