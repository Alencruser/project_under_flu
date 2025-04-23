import { DeleteResult } from 'typeorm';
import { BookToRead } from '../../entities/book-to-read';

export interface IBookToReadRepository {
  create(data: Partial<BookToRead>): BookToRead;
  save(book: BookToRead): Promise<BookToRead>;
  delete(data: { user_id: number; book_id: number }): Promise<DeleteResult>;
}
