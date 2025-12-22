import { NextFunction, Request, Response } from 'express';

// Utility to catch async errors in Express route handlers
// It removes the overhead of including try-catch blocks in each async function
const catchAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export default catchAsync;
