import { BookRepository } from '../repositories/bookRepository';
import { Book } from '../entities/book';

export class BookService {
  async getAllBooks(): Promise<Book[]> {
    return await BookRepository.find();
  }

  async getBookById(id: number): Promise<Book | null> {
    return await BookRepository.findOneBy({ id });
  }

  async createBook(data: Partial<Book>): Promise<Book> {
    const book = BookRepository.create(data);
    return await BookRepository.save(book);
  }

  async updateBook(id: number, data: Partial<Book>): Promise<Book | null> {
    const book = await BookRepository.findOneBy({ id });
    if (!book) return null;
    Object.assign(book, data);
    return await BookRepository.save(book);
  }

  async deleteBook(id: number): Promise<boolean> {
    const result = await BookRepository.delete(id);
    return result.affected !== 0;
  }
}

export const bookService = new BookService();
