import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../models/book.interface';
import { BookApiService } from './book-api.service';
import { IBookService } from './book-service.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService implements IBookService {
  constructor(private apiService: BookApiService) {}

  // Business logic for fetching all books, e.g., sorting them by last modified
  getAllBooks(): Observable<Book[]> {
    return this.apiService.getBooks().pipe(
      map((books) =>
        books.sort(
          (a, b) =>
            //todo trouver le moyen de corriger ca
            new Date(b.last_modification_date).getTime() -
            new Date(a.last_modification_date).getTime()
        )
      )
    );
  }

  getBooksByTitle(title: string): Observable<Book[]> {
    return this.apiService.getBooksByTitle(title).pipe(
      map((books) =>
        books.sort(
          (a, b) =>
            //todo trouver le moyen de corriger ca
            new Date(b.last_modification_date).getTime() -
            new Date(a.last_modification_date).getTime()
        )
      )
    );
  }

  getBook(id: number): Observable<Book> {
    return this.apiService.getBookById(id);
  }

  createBook(book: Book): Observable<Book> {
    const newBook = { ...book };
    return this.apiService.addBook(newBook);
  }

  editBook(book: Book): Observable<Book> {
    const updatedBook = { ...book, lastModified: new Date() };
    return this.apiService.updateBook(updatedBook);
  }

  removeBook(id: number): Observable<void> {
    return this.apiService.deleteBook(id);
  }
}
