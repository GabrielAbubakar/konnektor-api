import type { IUser } from '@/app/models';
import { User } from '@/app/models';
import { AppError, catchAsync } from '@/app/utils';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: IUser;
}

class AuthMiddleware {
    protect = catchAsync(
        async (req: AuthenticatedRequest, res: Response, next: Function): Promise<void> => {
            let token;

            // Check if token is present in headers
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1];
            }

            if (!token) {
                throw new AppError('You are not logged in', 401);
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
            const user = await User.findById(decoded.id);
            if (!user) {
                throw new AppError('User not found', 404);
            }

            req.user = user;
            next();
        }
    );

    restrictTo = (...roles: string[]) => {
        return catchAsync(
            async (req: AuthenticatedRequest, res: Response, next: Function): Promise<void> => {
                if (!req.user) {
                    throw new AppError('User not authenticated', 401);
                }

                if (req.user && !roles.includes(req.user.role)) {
                    throw new AppError('You do not have permission to perform this action', 403);
                }
                next();
            }
        );
    };
}
export const authMiddleware = new AuthMiddleware();
