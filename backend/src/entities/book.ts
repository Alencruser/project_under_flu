import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import "reflect-metadata";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    author!: string;

    @Column({ type: "text", nullable: true })
    note?: string;

    @Column({ type: "text", nullable: true })
    cover?: string;

    @CreateDateColumn()
    published_date!: Date;

    @UpdateDateColumn()
    last_modification_date?: Date;
}
