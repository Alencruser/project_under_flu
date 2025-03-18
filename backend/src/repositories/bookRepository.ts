import { AppDataSource } from "../config/data-source";
import { Book } from "../entities/book";

export const BookRepository = AppDataSource.getRepository(Book);
