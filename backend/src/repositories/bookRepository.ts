import { AppDataSource } from '../config/data-source';
import { Book } from '../entities/book';
import { DeleteResult, ILike, SelectQueryBuilder } from 'typeorm';
import { IBookRepository } from './interfaces/bookRepository.interface';

export class BookRepository implements IBookRepository {
  private readonly repo = AppDataSource.getRepository(Book);

  async find(): Promise<Book[]> {
    return await this.repo.find();
  }

  async findOneBy(where: object): Promise<Book | null> {
    return await this.repo.findOneBy(where);
  }

  async findByTitle(title: string): Promise<Book[]> {
    return await this.repo.find({
      where: { title: ILike(`%${title}%`) },
    });
  }

  create(data: Partial<Book>): Book {
    return this.repo.create(data);
  }

  async save(book: Book): Promise<Book> {
    return await this.repo.save(book);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }

  createQueryBuilder(entity: string): SelectQueryBuilder<Book> {
    return this.repo.createQueryBuilder(entity);
  }
}
