import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { authRoutes, socialProfileRoutes } from '@api/v1/routes';
// import { AppError } from '@/api/utils';
import globalErrorHandler from '@/api/middleware/globalErrorHandler';

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet({ crossOriginResourcePolicy: false }));

// Route Handlers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/social-profile', socialProfileRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Konnektor API is running' });
});

// handle non existent routes
// app.all('/', (req: Request, res: Response, next) => {
//     next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
// });

// Global error handler (must be last)
app.use(globalErrorHandler);

export default app;
