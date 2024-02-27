import { Schema, ValidationError } from 'yup';

export class SchemaValidator {
  protected schema: Schema;
  private data: any;

  constructor(data: any) {
    this.data = data;
  }

  async validate(): Promise<
    [e: ValidationError, data: unknown] | [e: null, data: any]
  > {
    try {
      const validation = await this.schema.validate(this.data, {
        abortEarly: false,
      });
      return [null, validation];
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e);
        return [e, null];
      }
      console.log('ERRO NÃO TRATADO');
      console.log(e);
    }
  }
}
