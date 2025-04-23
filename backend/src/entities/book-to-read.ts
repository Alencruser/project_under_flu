import 'reflect-metadata';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from './book';

@Entity()
export class BookToRead {
  @PrimaryColumn()
  user_id!: number;

  @PrimaryColumn()
  book_id!: number;

  @ManyToOne(() => Book, (book) => book.id)
  @JoinColumn({ name: 'book_id' })
  book!: Book;
}
