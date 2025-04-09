import { userController } from '../controllers/userController';
import { ConnectUserDTO } from '../dtos/connectUser.dto';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { Router } from 'express';
import { validateDtoMiddleware } from '../middlewares/validateDto';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post(
  '/connect',
  asyncHandler(validateDtoMiddleware(ConnectUserDTO)),
  (req, res, next) => {
    userController.connectUser(req, res).catch(next);
  }
);

router.post(
  '/register',
  asyncHandler(validateDtoMiddleware(CreateUserDTO)),
  (req, res, next) => {
    userController.createUser(req, res).catch(next);
  }
);

export default router;
