import { DeleteResult } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { BookToRead } from '../entities/book-to-read';
import { IBookToReadRepository } from './interfaces/bookToRead.interface';

export class BookToReadRepository implements IBookToReadRepository {
  private readonly repo = AppDataSource.getRepository(BookToRead);

  create(data: Partial<BookToRead>): BookToRead {
    return this.repo.create(data);
  }

  async save(data: BookToRead): Promise<BookToRead> {
    return await this.repo.save(data);
  }

  async delete(data: Partial<BookToRead>): Promise<DeleteResult> {
    return await this.repo.delete(data);
  }
}
