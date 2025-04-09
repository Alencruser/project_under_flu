import Jwt from 'jsonwebtoken';
import { IJWTService } from './interfaces/jwtService.interface';

export class JWTService implements IJWTService {
  private secretPass;

  constructor(secretPass: string) {
    if (!secretPass?.length) throw new Error('JWT SECRET NOT FOUND');
    this.secretPass = secretPass;
  }

  sign(username: string) {
    return Jwt.sign({ user: username }, this.secretPass, { expiresIn: '1h' });
  }

  verify(tokenReceived: string): string {
    try {
      const token = Jwt.verify(tokenReceived, this.secretPass);
      return (token as { user: string }).user;
    } catch (err: unknown) {
      throw err;
    }
  }
}

export const jwtService = new JWTService(process.env.JWT_SECRET!);
