import { Router } from 'express';
import { bookController } from '../controllers/bookController';
import { validateDtoMiddleware } from '../middlewares/validateDto';
import { CreateBookDTO } from '../dtos/createBook.dto';
import { asyncHandler } from '../utils/asyncHandler';
import { isConnectedMiddleware } from '../middlewares/isConnectedMiddleware';

const router = Router();

router.get('/', isConnectedMiddleware, (req, res, next) => {
  bookController.getMultipleBooks(req, res).catch(next);
});

router.get('/:id', isConnectedMiddleware, (req, res, next) => {
  bookController.getBookById(req, res).catch(next);
});

router.post(
  '/',
  isConnectedMiddleware,
  asyncHandler(validateDtoMiddleware(CreateBookDTO)),
  (req, res, next) => {
    bookController.createBook(req, res).catch(next);
  }
);

router.put(
  '/:id',
  isConnectedMiddleware,
  asyncHandler(validateDtoMiddleware(CreateBookDTO)),
  (req, res, next) => {
    bookController.updateBook(req, res).catch(next);
  }
);

router.delete('/:id', isConnectedMiddleware, (req, res, next) => {
  bookController.deleteBook(req, res).catch(next);
});

export default router;
