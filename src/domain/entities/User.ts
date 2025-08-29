export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}

export class User {
  constructor(
    public id: string,
    public email: string,
    public role: Roles,
    public passwordHash: string,
  ) {}
}
