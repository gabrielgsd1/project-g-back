import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { VALIDATE_SCHEMA_REQUEST_FIELD } from '../constants';
import { ValidateSchemaGuard } from './validateSchema.guard';
import { Reflector } from '@nestjs/core';
import { SchemaValidator } from '../schema';

export const SchemaDecorator =
  Reflector.createDecorator<typeof SchemaValidator>();

export function ValidateSchema(
  schema: typeof SchemaValidator,
  field?: 'query' | 'body' | 'params',
) {
  return applyDecorators(
    SetMetadata(VALIDATE_SCHEMA_REQUEST_FIELD, field || 'body'),
    SchemaDecorator(schema),
    UseGuards(ValidateSchemaGuard),
  );
}
