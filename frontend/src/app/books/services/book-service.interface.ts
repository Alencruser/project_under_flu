import { Observable } from 'rxjs';
import { Book } from '../models/book.interface';

export interface IBookService {
  getAllBooks(): Observable<Book[]>;
  getBook(id: number): Observable<Book>;
  createBook(book: Book): Observable<Book>;
  editBook(book: Book): Observable<Book>;
  removeBook(id: number): Observable<void>;
  rateBook(id: number, rating: number): Observable<void>;
  saveForLater(id: number, toSave: boolean): Observable<void>;
}
