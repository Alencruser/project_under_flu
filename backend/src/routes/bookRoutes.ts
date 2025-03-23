import { Router } from 'express';
import { bookController } from '../controllers/bookController';
import { validateDtoMiddleware } from '../middlewares/validateDto';
import { CreateBookDTO } from '../dtos/createBook.dto';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();

router.get('/', (req, res, next) => {
  bookController.getMultipleBooks(req, res).catch(next);
});

router.get('/:id', (req, res, next) => {
  bookController.getBookById(req, res).catch(next);
});

router.post(
  '/',
  asyncHandler(validateDtoMiddleware(CreateBookDTO)),
  (req, res, next) => {
    bookController.createBook(req, res).catch(next);
  }
);

router.put(
  '/:id',
  asyncHandler(validateDtoMiddleware(CreateBookDTO)),
  (req, res, next) => {
    bookController.updateBook(req, res).catch(next);
  }
);

router.delete('/:id', (req, res, next) => {
  bookController.deleteBook(req, res).catch(next);
});

export default router;
