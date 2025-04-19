import { BookRating } from 'entities/book-rating';

export interface IBookRatingRepository {
  create(data: Partial<BookRating>): BookRating;
  save(book: BookRating): Promise<BookRating>;
}
