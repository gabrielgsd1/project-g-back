import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('E-mail já cadastrado', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
