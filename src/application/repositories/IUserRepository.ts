import { User } from '@/domain/entities/user';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  create(user: User): Promise<void>;
}