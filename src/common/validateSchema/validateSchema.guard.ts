import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { VALIDATE_SCHEMA_REQUEST_FIELD } from '../constants';
import { SchemaDecorator } from './validateSchema.decorator';
import { InvalidSchemaException } from 'src/exceptions/InvalidSchemaException.exception';

@Injectable()
export class ValidateSchemaGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const field = this.reflector.getAllAndOverride(
      VALIDATE_SCHEMA_REQUEST_FIELD,
      [context.getClass(), context.getHandler()],
    );
    const schema = this.reflector.get(SchemaDecorator, context.getHandler());
    const dataToValidate = request[field];
    const schemaClass = new schema(dataToValidate);
    const [err] = await schemaClass.validate();
    if (err) throw new InvalidSchemaException();
    return true;
  }
}
