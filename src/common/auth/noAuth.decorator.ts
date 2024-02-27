import { SetMetadata, applyDecorators } from '@nestjs/common';
import { NO_AUTH_DECORATOR_FIELD } from '../constants';

export const NoAuth = applyDecorators(
  SetMetadata(NO_AUTH_DECORATOR_FIELD, true),
);
