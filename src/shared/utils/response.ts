import type { Response } from 'express';

export class ApiResponse {
  constructor(private res: Response) {}

  public success<T>({
    data,
    statusCode = 200,
    msg,
  }: {
    data: T;
    statusCode: number;
    msg?: string;
  }): any {
    return this.res.status(statusCode).json({
      success: true,
      data,
      message: msg,
    });
  }

  public error({
    error,
    statusCode = 400,
    msg,
  }: {
    error: string | object;
    statusCode: number;
    msg?: string;
  }): any {
    return this.res.status(statusCode).json({
      success: false,
      message: msg,
      error,
    });
  }
}
