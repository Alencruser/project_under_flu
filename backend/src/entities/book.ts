import 'reflect-metadata';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookRating } from './book-rating';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column({ type: 'text', nullable: true })
  note?: number;

  @Column({ type: 'text', nullable: true })
  cover?: string;

  @Column({ type: 'date' })
  published_date!: Date;

  @UpdateDateColumn()
  last_modification_date!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @Column()
  created_by!: number;

  @OneToMany(() => BookRating, (rating) => rating.book_id)
  ratings?: BookRating[];
}
