import { Request, Response } from 'express';
import { bookService } from '../services/bookService'; // Import the instance

class BookController {
  async getMultipleBooks(req: Request, res: Response) {
    const { title } = req.query;
    if (title) {
      const books = await bookService.getBooksByTitle(title as string);
      res.json(books);
    } else {
      const books = await bookService.getAllBooks();
      res.json(books);
    }
  }

  async getBookById(req: Request, res: Response) {
    const book = await bookService.getBookById(Number(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  }

  async createBook(req: Request, res: Response) {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  }

  async updateBook(req: Request, res: Response) {
    const book = await bookService.updateBook(Number(req.params.id), req.body);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  }

  async deleteBook(req: Request, res: Response) {
    const success = await bookService.deleteBook(Number(req.params.id));
    if (!success) return res.status(404).json({ message: 'Book not found' });
    res.status(204).send();
  }
}

export const bookController = new BookController();
