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

  getAllBooks(): Observable<Book[]> {
    return this.apiService
      .getBooks()
      .pipe(
        map((books) =>
          books.sort(
            (a, b) =>
              new Date(b.last_modification_date).getTime() -
              new Date(a.last_modification_date).getTime()
          )
        )
      );
  }

  getBooksByTitle(title: string): Observable<Book[]> {
    return this.apiService
      .getBooksByTitle(title)
      .pipe(
        map((books) =>
          books.sort(
            (a, b) =>
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
    const updatedBook = { ...book };
    return this.apiService.updateBook(updatedBook);
  }

  removeBook(id: number): Observable<void> {
    return this.apiService.deleteBook(id);
  }

  rateBook(id: number, rating: number) {
    if (rating == -1) {
      return this.apiService.removeRatingForBook(id);
    }
    return this.apiService.rateBook(id, rating);
  }
}
