export interface TokenPayload {
  userId: string;
  role: string;
  // this can be any other key:value
  [key: string]: any;
}

export interface TokenPort {
  signAccessToken({ payload }: { payload: TokenPayload }): string;
  signRefreshToken({ payload }: { payload: TokenPayload }): string;
  // returns a payload ->verify and decode
  verifyAccessToken({ token }: { token: string }): TokenPayload;
  verifyRefreshToken({ token }: { token: string }): TokenPayload;
}
