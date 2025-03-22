import { BookRepository } from '../repositories/bookRepository';
import { Book } from '../entities/book';
import { IBookRepository } from 'repositories/interfaces/bookRepository.interface';
import { DeleteResult } from 'typeorm';

export class BookService {
  private bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async getBookById(id: number): Promise<Book | null> {
    return await this.bookRepository.findOneBy({ id });
  }

  async getBooksByTitle(title: string): Promise<Book[]> {
    return await this.bookRepository.findByTitle(title);
  }

  async createBook(data: Partial<Book>): Promise<Book> {
    const book = this.bookRepository.create(data);
    return await this.bookRepository.save(book);
  }

  async updateBook(id: number, data: Partial<Book>): Promise<Book | null> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) return null;
    Object.assign(book, data);
    return await this.bookRepository.save(book);
  }

  async deleteBook(id: number): Promise<boolean> {
    const result: DeleteResult = await this.bookRepository.delete(id);

    return (result.affected ?? 0) !== 0;
  }
}
const bookRepository = new BookRepository();
export const bookService = new BookService(bookRepository);
