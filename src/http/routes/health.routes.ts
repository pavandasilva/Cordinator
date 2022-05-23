import { Router, Request, Response } from 'express';
const healthRoutes = Router();

healthRoutes.get('/health', async (_: Request, response: Response) => {
	response.json({ ok: true })
});

export { healthRoutes }