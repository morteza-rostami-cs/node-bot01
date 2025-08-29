import { config } from '@/config';
import jwt from 'jsonwebtoken';
import type { Secret, SignOptions } from 'jsonwebtoken';
import type { TokenPort, TokenPayload } from '../ports/TokenPort';

export class JwtTokenAdaptor implements TokenPort {
  private readonly accessSecret: Secret;
  private readonly refreshSecret: Secret;
  private readonly accessExpiresIn: SignOptions['expiresIn'];
  private readonly refreshExpiresIn: SignOptions['expiresIn'];

  constructor() {
    const accessSecret = config.auth.accessSecret;
    const refreshSecret = config.auth.refreshSecret;

    if (!accessSecret || !refreshSecret) throw new Error('secrets are missing from env');

    this.accessSecret = accessSecret;
    this.refreshSecret = refreshSecret;
    this.accessExpiresIn = '15m'; // short-lived
    this.refreshExpiresIn = '7d'; // long-lived
  }

  // sign a access token
  public signAccessToken({ payload }: { payload: TokenPayload }): string {
    return jwt.sign(payload, this.accessSecret, { expiresIn: this.accessExpiresIn } as SignOptions);
  }

  // sign a refresh token
  public signRefreshToken({ payload }: { payload: TokenPayload }): string {
    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpiresIn,
    } as SignOptions);
  }

  // verify accessToken
  public verifyAccessToken({ token }: { token: string }): TokenPayload {
    return jwt.verify(token, this.refreshSecret) as TokenPayload;
  }

  // verity refreshToken
  public verifyRefreshToken({ token }: { token: string }): TokenPayload {
    return jwt.verify(token, this.refreshSecret) as TokenPayload;
  }
}
