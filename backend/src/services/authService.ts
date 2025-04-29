import { IUserRepository } from '../repositories/interfaces/userRepository.interface';
import { IAuthService } from './interfaces/authService.interface';
import { UserRepository } from '../repositories/userRepository';
import { cryptService } from './cryptService';
import { User } from '../entities/user';
import { jwtService } from './jwtService';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

export class AuthService implements IAuthService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async register(data: User) {
    data.password = cryptService.hashPassword(data.password);
    data.username = data.username.toLowerCase();
    const user = this.userRepository.create(data);
    const savedUser = await this.userRepository.save(user);
    const token = jwtService.sign(`${savedUser.username}_${savedUser.id}`);
    return { ...savedUser, jwt: token };
  }

  async connect(data: User): Promise<User & { jwt: string }> {
    const savedUser = await this.userRepository.findOneBy({
      username: data.username.toLowerCase(),
    });
    if (!savedUser) throw new InvalidCredentialsError();
    if (cryptService.checkPasswordMatch(data.password, savedUser!.password)) {
      const token = jwtService.sign(`${savedUser!.username}_${savedUser!.id}`);
      return { ...savedUser!, jwt: token };
    }
    throw new InvalidCredentialsError();
  }
}
const userRepository: IUserRepository = new UserRepository();
export const authService: IAuthService = new AuthService(userRepository);
