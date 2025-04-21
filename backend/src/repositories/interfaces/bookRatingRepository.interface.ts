import { BookRating } from 'entities/book-rating';
import { DeleteResult } from 'typeorm';

export interface IBookRatingRepository {
  create(data: Partial<BookRating>): BookRating;
  save(book: BookRating): Promise<BookRating>;
  delete(data: { user_id: number; book_id: number }): Promise<DeleteResult>;
}
