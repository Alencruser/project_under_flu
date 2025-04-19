import 'reflect-metadata';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
