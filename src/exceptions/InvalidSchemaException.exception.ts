import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidSchemaException extends HttpException {
  constructor() {
    super('AAAAAAAAAAA', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
