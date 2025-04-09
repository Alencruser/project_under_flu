import { User } from '../../entities/user';

export interface IAuthService {
  register(data: User): Promise<User>;
  connect(data: Partial<User>): Promise<User>;
}
