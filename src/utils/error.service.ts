import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
@Injectable()
export class ErrorService {
  handleHttpException(error: any, message: string): void {
    const errorMessage =
      error.detail || error.message || 'Internal Server Error';
    throw new HttpException(
      {
        message: message,
        error: errorMessage,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
