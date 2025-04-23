import { Request, Response } from 'express';
import { authService } from '../services/authService'; // Import the instance
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { jwtService } from '../services/jwtService';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const User = await authService.register(req.body);
      res.status(201).json(User);
    } catch (error) {
      res.status(500).json({ message: 'Error creating User', error });
    }
  }

  async connectUser(req: Request, res: Response) {
    try {
      const User = await authService.connect(req.body);
      res.status(201).json(User);
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const token = await jwtService.refreshToken(req.body.token);
      res.status(201).json({ token });
    } catch (error) {
      throw error;
    }
  }
}

export const userController = new UserController();
