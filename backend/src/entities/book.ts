import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  Check,
} from 'typeorm';
import { User } from './user'; // Assuming User is in a separate file

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

  @Column({ type: 'integer', nullable: true })
  rating?: number;

  @Column({ type: 'text', nullable: true })
  cover?: string;

  @Column({ type: 'date' })
  published_date!: Date;

  @UpdateDateColumn()
  last_modification_date!: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
