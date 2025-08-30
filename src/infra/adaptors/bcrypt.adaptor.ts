import bcrypt from 'bcrypt';
import type { HashingPort } from '@/application/user/ports/IHashingPort.js';

export class BcryptHashingAdaptor implements HashingPort {
  private readonly saltRounds: number;

  constructor({ saltRounds = 12 }: { saltRounds: number }) {
    this.saltRounds = saltRounds;
  }

  // Hash a password
  public async hash({ password }: { password: string }): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  // Compare password password with hashed password
  public async compare({
    password,
    hashed,
  }: {
    password: string;
    hashed: string;
  }): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }
}
