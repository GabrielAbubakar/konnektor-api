import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { authRoutes } from '@api/v1/routes';
import globalErrorHandler from '@/api/middleware/globalErrorHandler';

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet({ crossOriginResourcePolicy: false }));

// Route Handlers
app.use('/api/v1/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Konnektor API is running' });
});

// Global error handler (must be last)
app.use(globalErrorHandler);

export default app;
