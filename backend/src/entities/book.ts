import "reflect-metadata";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

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

    @Column({ type: "date" })
    published_date!: Date;

    @UpdateDateColumn()
    last_modification_date!: Date;
}
