import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttpClientService } from 'src/app/auth/services/auth-http-client.service';
import { Book } from '../models/book.interface';
import { IBookApiService } from './book-api-service.interface';

@Injectable({
  providedIn: 'root',
})
export class BookApiService implements IBookApiService {
  private apiUrl = 'http://localhost:3000/books';

  //use of AuthHttp instead of http to take care of login state
  constructor(private http: AuthHttpClientService) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  getBooksByTitle(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(
      `${this.apiUrl}?title=${encodeURIComponent(title)}`
    );
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${book.id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  rateBook(id: number, rating: number) {
    return this.http.post<void>(`${this.apiUrl}/${id}/rating`, { rating });
  }

  removeRatingForBook(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}/rating`);
  }

  saveForLater(id: number) {
    return this.http.post<void>(`${this.apiUrl}/${id}/save`, {});
  }

  removeSavedBook(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}/save`);
  }
}
