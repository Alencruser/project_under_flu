import { DeleteResult } from 'typeorm';
import { Book } from '../entities/book';
import { BookRepository } from '../repositories/bookRepository';
import { IBookService } from './interfaces/bookService.interface';
import { IBookRepository } from '../repositories/interfaces/bookRepository.interface';
import { IBookRatingRepository } from '../repositories/interfaces/bookRatingRepository.interface';
import { BookRatingRepository } from '../repositories/bookRatingRepository';
import { BookRating } from '../entities/book-rating';
import { AppDataSource } from '../config/data-source';

export class BookService implements IBookService {
  private bookRepository: IBookRepository;
  private bookRatingRepository: IBookRatingRepository;

  constructor(
    bookRepository: IBookRepository,
    bookRatingRepository: IBookRatingRepository
  ) {
    this.bookRepository = bookRepository;
    this.bookRatingRepository = bookRatingRepository;
  }

  async getAllBooks(
    userId: number
  ): Promise<(Book & { myRating: number | null })[]> {
    const bookMetadata = AppDataSource.getMetadata(Book);
    const bookColumns = bookMetadata.columns.map((col) => col.propertyName);
    const bookSelects = bookColumns.map((col) => `book.${col} AS ${col}`);
    bookSelects.push('rating.rating AS rating');

    return await this.bookRepository
      .createQueryBuilder('book')
      .leftJoin(
        BookRating,
        'rating',
        'rating.book_id = book.id AND rating.user_id = :userId',
        { userId }
      )
      .select(bookSelects)
      .getRawMany();
  }

  async getBookById(id: number): Promise<Book | null> {
    return await this.bookRepository.findOneBy({ id });
  }

  async getBooksByTitle(title: string): Promise<Book[]> {
    return await this.bookRepository.findByTitle(title);
  }

  async createBook(userId: number, data: Partial<Book>): Promise<Book> {
    const book = this.bookRepository.create({ ...data, created_by: userId });
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

  async rateBook(bookId: number, userId: number, data: { rating: number }) {
    if (!userId) throw new Error('User id not found');
    const addedData = { ...data, book_id: bookId, user_id: userId };
    const bookRating = this.bookRatingRepository.create(addedData);
    return await this.bookRatingRepository.save(bookRating);
  }

  async removeRatingBook(bookId: number, userId: number): Promise<boolean> {
    if (!userId) throw new Error('User id not found');
    const result: DeleteResult = await this.bookRatingRepository.delete({
      user_id: userId,
      book_id: bookId,
    });
    return (result.affected ?? 0) !== 0;
  }
}
const bookRepository = new BookRepository();
const bookRatingRepository = new BookRatingRepository();
export const bookService: IBookService = new BookService(
  bookRepository,
  bookRatingRepository
);
