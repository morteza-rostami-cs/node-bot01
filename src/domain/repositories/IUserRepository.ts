import { User } from '../entities/User';

export interface IUserRepository {
  create({ user }: { user: User }): Promise<User>;
  findByEmail({ email }: { email: string }): Promise<User | null>;
  findById({ id }: { id: string }): Promise<User | null>;
}
