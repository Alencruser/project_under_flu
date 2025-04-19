import { AppDataSource } from '../config/data-source';
import { BookRating } from '../entities/book-rating';
import { IBookRatingRepository } from './interfaces/bookRatingRepository.interface';

export class BookRatingRepository implements IBookRatingRepository {
  private readonly repo = AppDataSource.getRepository(BookRating);

  create(data: Partial<BookRating>): BookRating {
    return this.repo.create(data);
  }

  async save(data: BookRating): Promise<BookRating> {
    return await this.repo.save(data);
  }
}
