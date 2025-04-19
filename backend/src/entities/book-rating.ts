import 'reflect-metadata';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class BookRating {
  @PrimaryColumn()
  user_id!: number;

  @PrimaryColumn()
  book_id!: number;

  @Column()
  rating!: number;
}
