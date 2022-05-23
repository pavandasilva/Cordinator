import registerTenantService, { RegisterTenantInput } from "@services/register-tenant/register-tenant.service";
import { Request, Response } from "express";
import { badRequest, created } from "./_utils/http-response";

export type RegisterTenantControllerRequest = Request<null, null, RegisterTenantInput>;

export default async function(req: RegisterTenantControllerRequest, res: Response){
  const result = await registerTenantService(req.body);

  if(result.isFailure()){
    const error = result.value;
    return badRequest(res, result.value);
  }

  return created(res, result.value);
}