import { SchemaValidator } from 'src/common/schema';
import { date, object, string } from 'yup';

export class CreateUserSchema extends SchemaValidator {
  constructor(data: any) {
    super(data);
    this.schema = object({
      email: string().email('E-mail inválido').required('E-mail é obrigatório'),
      password: string().min(8).required('Senha é obrigatória'),
      name: string().required('Nome é obrigatório'),
      birthdate: date().required('data é obrigatória'),
    }).required('');
  }
}
