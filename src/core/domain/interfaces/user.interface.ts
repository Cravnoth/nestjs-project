import { User } from '@core/infrastructure/entities/user.entity';

export interface IUserRepository {
  create(data: User): Promise<User>;
  findOne(userId: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(data: Partial<User>, userId: string): Promise<void>;
}
