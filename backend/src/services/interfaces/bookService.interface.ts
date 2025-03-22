import { Book } from '../../entities/book';

export interface IBookService {
  getAllBooks(): Promise<Book[]>;
  getBookById(id: number): Promise<Book | null>;
  getBooksByTitle(title: string): Promise<Book[]>;
  createBook(data: Partial<Book>): Promise<Book>;
  updateBook(id: number, data: Partial<Book>): Promise<Book | null>;
  deleteBook(id: number): Promise<boolean>;
}
