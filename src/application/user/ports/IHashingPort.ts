export interface HashingPort {
  // a function to hash password
  hash({ password }: { password: string }): Promise<string>;
  // decode and compare password
  compare({ password, hashed }: { password: string; hashed: string }): Promise<boolean>;
}
