import 'reflect-metadata';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from './book';

@Entity()
export class BookRating {
  @PrimaryColumn()
  user_id!: number;

  @PrimaryColumn()
  book_id!: number;

  @Column()
  rating!: number;

  @ManyToOne(() => Book, (book) => book.ratings)
  @JoinColumn({ name: 'book_id' })
  book!: Book;
}
