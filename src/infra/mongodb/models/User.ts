import { Roles } from '@/domain/entities/User.js';
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  role: Roles;
  passwordHash: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: Object.values(Roles),
      required: true,
    },
    passwordHash: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<IUser>('User', userSchema);
