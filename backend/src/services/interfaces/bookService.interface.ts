import { BookRating } from 'entities/book-rating';
import { Book } from '../../entities/book';

export interface IBookService {
  getAllBooks(): Promise<Book[]>;
  getBookById(id: number): Promise<Book | null>;
  getBooksByTitle(title: string): Promise<Book[]>;
  createBook(userId: number, data: Partial<Book>): Promise<Book>;
  updateBook(id: number, data: Partial<Book>): Promise<Book | null>;
  deleteBook(id: number): Promise<boolean>;
  rateBook(
    bookId: number,
    userId: number,
    data: { rating: number }
  ): Promise<BookRating>;
}
