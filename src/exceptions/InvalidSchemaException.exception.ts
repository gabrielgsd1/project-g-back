import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidSchemaException extends HttpException {
  constructor() {
    super('Dados enviados de forma incorreta', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
