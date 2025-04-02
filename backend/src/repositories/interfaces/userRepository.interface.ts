import { DeleteResult } from 'typeorm';
import { User } from '../../entities/user';

export interface IUserRepository {
  findOneBy(where: object): Promise<User | null>;
  create(data: Partial<User>): User;
  save(user: User): Promise<User>;
}
