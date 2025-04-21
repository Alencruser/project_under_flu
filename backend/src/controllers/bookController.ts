import { Request, Response } from 'express';
import { bookService } from '../services/bookService'; // Import the instance

class BookController {
  async getMultipleBooks(req: Request, res: Response) {
    const { title } = req.query;
    const userId = req.user!.id;
    if (title) {
      const books = await bookService.getBooksByTitle(title as string);
      res.json(books);
    } else {
      const books = await bookService.getAllBooks(Number(userId));
      res.json(books);
    }
  }

  async getBookById(req: Request, res: Response) {
    const book = await bookService.getBookById(Number(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  }

  async createBook(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const book = await bookService.createBook(Number(userId), req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ message: 'Error creating book', error });
    }
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

  async rateBook(req: Request, res: Response) {
    if (!req.user?.id)
      return res.status(401).json({ message: 'User not found' });
    const bookRating = await bookService.rateBook(
      Number(req.params.id),
      Number(req.user.id),
      req.body
    );
    if (!bookRating) return res.status(404).json({ message: 'Book not found' });
    res.status(201).json(bookRating);
  }

  async removeRatingOnBook(req: Request, res: Response) {
    if (!req.user?.id)
      return res.status(401).json({ message: 'User not found' });
    const success = await bookService.removeRatingBook(
      Number(req.params.id),
      Number(req.user.id)
    );
    if (!success) return res.status(404).json({ message: 'Rate not found' });
    res.status(204).send();
  }
}

export const bookController = new BookController();
