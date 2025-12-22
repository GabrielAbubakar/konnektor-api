import { Request, Response } from 'express';
import { userService } from '@/app/services/user.service';
import { catchAsync } from '@/app/utils';
import { authService } from '@/app/services';
import { AppError } from '@/app/utils';

class AuthController {
    register = catchAsync(async (req: Request, res: Response) => {
        const data = req.body;
        if (!data || !data.email || !data.name || !data.password) {
            throw new AppError('Missing required fields', 400);
        }

        await userService.createUser(data);

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
        });
    });

    login = catchAsync(async (req: Request, res: Response) => {
        // Login logic here
        const data = req.body;
        if (!data || !data.email || !data.password) {
            throw new AppError('Missing required fields', 400);
        }

        const { token } = await authService.login(data);

        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            token,
        });
    });

    ping = catchAsync(async (req: Request, res: Response) => {
        res.status(200).json({
            status: 'success',
            message: 'pong',
        });
    });
}

export const authController = new AuthController();
