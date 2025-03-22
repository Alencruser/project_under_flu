import { Router } from 'express';
import { bookController } from '../controllers/bookController';

const router = Router();

router.get('/', (req, res, next) => {
  bookController.getAllBooks(req, res).catch(next);
});

router.get('/:id', (req, res, next) => {
  bookController.getBookById(req, res).catch(next);
});

router.post('/', (req, res, next) => {
  bookController.createBook(req, res).catch(next);
});

router.put('/:id', (req, res, next) => {
  bookController.updateBook(req, res).catch(next);
});

router.delete('/:id', (req, res, next) => {
  bookController.deleteBook(req, res).catch(next);
});

export default router;
