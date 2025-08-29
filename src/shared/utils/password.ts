import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export async function hashPassword({ password }: { password: string }): Promise<string> {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  return hashed;
}

// un hash and compare password
export async function comparePassword({
  password,
  hashed,
}: {
  password: string;
  hashed: string;
}): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}
