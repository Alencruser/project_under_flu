import { BookRating } from 'entities/book-rating';
import { Book } from '../../entities/book';
import { BookToRead } from '../../entities/book-to-read';

export interface IBookService {
  getAllBooks(userId: number): Promise<(Book & { myRating: number | null })[]>;
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
  removeRatingBook(bookId: number, userId: number): Promise<Boolean>;
  savedForLater(bookId: number, userId: number): Promise<BookToRead>;
  removeSavedBook(bookId: number, userId: number): Promise<Boolean>;
}
