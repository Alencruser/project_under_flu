import { userController } from '../controllers/userController';
import { ConnectUserDTO } from '../dtos/connectUser.dto';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { Router } from 'express';
import { validateDtoMiddleware } from '../middlewares/validateDto';
import { asyncHandler } from '../utils/asyncHandler';
import { RefreshTokenDTO } from '../dtos/refreshToken.dto';

const router = Router();

router.post(
  '/connect',
  asyncHandler(validateDtoMiddleware(ConnectUserDTO)),
  (req, res, next) => {
    userController.connectUser(req, res).catch((err) => next(err));
  }
);

router.post(
  '/register',
  asyncHandler(validateDtoMiddleware(CreateUserDTO)),
  (req, res, next) => {
    userController.createUser(req, res).catch(next);
  }
);

router.post(
  '/refresh',
  asyncHandler(validateDtoMiddleware(RefreshTokenDTO)),
  (req, res, next) => {
    userController.refreshToken(req, res).catch(next);
  }
);

export default router;
