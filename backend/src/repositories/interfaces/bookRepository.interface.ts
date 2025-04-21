import { DeleteResult } from 'typeorm';
import { Book } from '../../entities/book';

export interface IBookRepository {
  find(): Promise<Book[]>;
  findOneBy(where: object): Promise<Book | null>;
  findByTitle(title: string): Promise<Book[]>;
  create(data: Partial<Book>): Book;
  save(book: Book): Promise<Book>;
  delete(id: number): Promise<DeleteResult>;
  createQueryBuilder(entity: string): any;
}
