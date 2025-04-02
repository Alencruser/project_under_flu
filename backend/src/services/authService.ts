import { IUserRepository } from 'repositories/interfaces/userRepository.interface';
import { IAuthService } from './interfaces/authService.interface';
import { UserRepository } from 'repositories/userRepository';
import { cryptService } from './cryptService';
import { User } from 'entities/user';

export class AuthService implements IAuthService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async register(user: User) {}

  async connect(username: string, password: string) {
    const savedUser = await this.userRepository.findOneBy({ username });
    if (!savedUser) throw new Error('User of password unknown');
    if (cryptService.checkPasswordMatch(password, savedUser?.password)) {
      // call token service to return user and token
    }
  }
}
const userRepository: IUserRepository = new UserRepository();
export const authService: IAuthService = new AuthService(userRepository);
