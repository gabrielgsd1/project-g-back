import { SchemaValidator } from 'src/common/schema';
import { object, string } from 'yup';

export class LoginSchema extends SchemaValidator {
  constructor(data: any) {
    super(data);
    this.schema = object({
      email: string()
        .email('E-mail inválido')
        .required('Obrigatório informar o e-mail'),
      password: string().required('Obrigatório informar a senha'),
    }).required('Objeto é obrigatório');
  }
}
