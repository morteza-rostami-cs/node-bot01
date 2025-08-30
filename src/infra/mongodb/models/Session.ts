import { Schema, model, Document } from 'mongoose';

export interface ISession extends Document {
  userId: Schema.Types.ObjectId;
  token: string;
  createAt: Date;
  expiresAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export default model<ISession>('Session', sessionSchema);
