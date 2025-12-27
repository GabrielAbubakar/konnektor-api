import type { Request, Response } from 'express';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { authRoutes, eventRoutes, socialProfileRoutes, userRoutes } from '@/app/routes';
// import { AppError } from '@/api/utils';
import globalErrorHandler from '@/app/middleware/globalErrorHandler';

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet({ crossOriginResourcePolicy: false }));

// Route Handlers
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/social-profiles', socialProfileRoutes);
app.use('/events', eventRoutes);

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
