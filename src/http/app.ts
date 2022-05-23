import express from 'express';
import cors from 'cors';
import { healthRoutes, tenantRoutes } from './routes';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(healthRoutes);
app.use(tenantRoutes);

export default app;