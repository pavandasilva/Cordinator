import registerTenantController, { RegisterTenantControllerRequest } from '@http/controllers/register-tenant.controller';
import { Router, Response } from 'express';

const tenantRoutes = Router();

tenantRoutes.post('/tenants', async (request: RegisterTenantControllerRequest, response: Response) => {
	return registerTenantController(request, response);
});

export { tenantRoutes }