import type { IUserRepository } from '@/domain/repositories/IUserRepository.js';
import { User } from '@/domain/entities/User.js';
import { UserModel } from '@/infra/database/models/User.js';
// import { Schema, model, Document } from 'mongoose';

export class MongooseUserRepo implements IUserRepository {
  public async create({ user }: { user: User }): Promise<User> {
    const doc = await UserModel.create({
      email: user.email,
      passwordHash: user.passwordHash,
    });

    return new User(doc.id.toString(), doc.email, doc.passwordHash);
  }

  public async findByEmail({ email }: { email: string }): Promise<User | null> {
    const doc = await UserModel.findOne({ email }).exec();
    if (!doc) return null;

    return new User(doc.id.toString(), doc.email, doc.passwordHash);
  }

  public async findById({ id }: { id: string }): Promise<User | null> {
    const doc = await UserModel.findById(id).exec();
    if (!doc) return null;

    return new User(doc.id.toString(), doc.email, doc.passwordHash);
  }
}
