import { IUserRepository } from '../repositories/interfaces/userRepository.interface';
import { IAuthService } from './interfaces/authService.interface';
import { UserRepository } from '../repositories/userRepository';
import { cryptService } from './cryptService';
import { User } from '../entities/user';
import { jwtService } from './jwtService';

export class AuthService implements IAuthService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async register(data: User) {
    data.password = cryptService.hashPassword(data.password);
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async connect(data: User): Promise<User & { jwt: string }> {
    const savedUser = await this.userRepository.findOneBy({
      username: data.username,
    });
    if (!savedUser) throw new Error('User or password unknown');
    if (cryptService.checkPasswordMatch(data.password, savedUser?.password)) {
      const token = jwtService.sign(savedUser.username);
      return { ...savedUser, jwt: token };
    }
    throw new Error('User or password unknown');
  }
}
const userRepository: IUserRepository = new UserRepository();
export const authService: IAuthService = new AuthService(userRepository);
