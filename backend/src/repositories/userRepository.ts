import { AppDataSource } from '../config/data-source';
import { User } from '../entities/user';
import { IUserRepository } from './interfaces/userRepository.interface';

export class UserRepository implements IUserRepository {
  private readonly repo = AppDataSource.getRepository(User);

  async findOneBy(where: object): Promise<User | null> {
    return await this.repo.findOneBy(where);
  }

  create(data: Partial<User>): User {
    return this.repo.create(data);
  }

  async save(User: User): Promise<User> {
    return await this.repo.save(User);
  }
}
