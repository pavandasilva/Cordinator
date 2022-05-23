import Joi from 'joi';
import { Either } from '../../core/either';
import { RegisterTenantInput } from '../register-tenant.service';
import handleValidateResult from '../_utils/handle-validador-result';

export default function (data: RegisterTenantInput):  Either<Error, RegisterTenantInput>{
  const scheme = Joi.object<RegisterTenantInput>({
    name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    cellphone: Joi.string().required(),
    whatsapp: Joi.string().required(),
  });

  const result = scheme.validate(data);

  return handleValidateResult<RegisterTenantInput>(result)
}