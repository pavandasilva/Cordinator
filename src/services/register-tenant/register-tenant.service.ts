import { Either, failure, success } from "@core/either";
import { Tenant, TenantStatus } from "@prisma/client";
import prisma from "@database/prisma-client";
import registerTenantValidator from "@services/register-tenant/register-tenant.validator";

export type RegisterTenantInput = {
  name: string,
  email: string,
  cellphone: string,
  whatsapp: string,
}

type RegisterTenantOutput = Either<Error, Tenant>

export default async function (input: RegisterTenantInput): Promise<RegisterTenantOutput>{
  const validated = registerTenantValidator(input);

  if(validated.isFailure()){
    return failure(validated.value);
  }

  const data = validated.value;

  const result = await prisma.tenant.create({
    data: {
      status: TenantStatus.active,
      User: {
        create: {
          name: data.name,
          whatsapp: data.whatsapp,
          cellphone: data.cellphone,
          email: data.email,
        }
      }
    },
  });

  return success(result);
}