import { Observable } from 'rxjs';
import { Book } from '../models/book.interface';

export interface IBookApiService {
  getBooks(): Observable<Book[]>;
  getBookById(id: number): Observable<Book>;
  addBook(book: Book): Observable<Book>;
  updateBook(book: Book): Observable<Book>;
  deleteBook(id: number): Observable<void>;
  rateBook(id: number, rating: number): Observable<void>;
  removeRatingForBook(id: number): Observable<void>;
}
