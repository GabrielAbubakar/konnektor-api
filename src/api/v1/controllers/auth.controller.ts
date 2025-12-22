import { Request, Response } from 'express';
import { userService } from '@v1/services/user.service';
import { catchAsync } from '@api/utils';
import { authService } from '@/api/v1/services';

class AuthController {
    register = catchAsync(async (req: Request, res: Response) => {
        const data = req.body;
        await userService.createUser(data);

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
        });
    });

    login = catchAsync(async (req: Request, res: Response) => {
        // Login logic here
        const data = req.body;
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
