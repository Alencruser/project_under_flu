import bcrypt from 'bcryptjs';
import { ICryptService } from './interfaces/cryptService.interface';

export class CryptService implements ICryptService {
  private salt;

  constructor() {
    this.salt = bcrypt.genSaltSync(10);
  }

  public hashPassword(pass: string): string {
    return bcrypt.hashSync(pass, this.salt);
  }

  public checkPasswordMatch(pass: string, hash: string): boolean {
    return bcrypt.compareSync(pass, hash);
  }
}
export const cryptService = new CryptService();
