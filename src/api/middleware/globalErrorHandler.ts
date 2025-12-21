import { Request, Response, NextFunction } from 'express';
import AppError from '@api/utils/AppError';

interface ErrorResponse {
    status: string;
    message: string;
    statusCode?: number;
    errors?: any;
}

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;

    const response: ErrorResponse = {
        status: 'error',
        message: err.message,
    };

    // Operational errors (errors we've intentionally thrown)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(response);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        err.statusCode = 400;
        const errors = Object.values(err.errors).map((e: any) => e.message);
        response.message = 'Validation error';
        response.errors = errors;
        return res.status(400).json(response);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        err.statusCode = 409;
        response.message = `${field} already exists`;
        return res.status(409).json(response);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        err.statusCode = 401;
        response.message = 'Invalid token';
        return res.status(401).json(response);
    }

    if (err.name === 'TokenExpiredError') {
        err.statusCode = 401;
        response.message = 'Token expired';
        return res.status(401).json(response);
    }

    // Unknown errors - log and return generic message
    console.error('Unhandled error:', err);
    response.statusCode = err.statusCode;

    return res.status(err.statusCode).json({
        status: 'error',
        message: err.statusCode === 500 ? 'Something went wrong' : err.message,
    });
};

export default globalErrorHandler;
