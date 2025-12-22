import { catchAsync } from '@/app/utils';
import { Request, Response } from 'express';

class SocialProfileController {
    create = catchAsync(async (req: Request, res: Response) => {
        const data = req.body;

        res.status(201).json({
            status: 'success',
            message: 'Social profile created successfully',
        });
    });

    getAll = catchAsync(async (req: Request, res: Response) => {
        const data = req.body;

        res.status(200).json({
            status: 'success',
            message: 'User created successfully',
        });
    });

    getById = catchAsync(async (req: Request, res: Response) => {
        const data = req.body;

        res.status(200).json({
            status: 'success',
            message: 'User created successfully',
        });
    });

    updateById = catchAsync(async (req: Request, res: Response) => {
        const data = req.body;

        res.status(200).json({
            status: 'success',
            message: 'User created successfully',
        });
    });

    deleteById = catchAsync(async (req: Request, res: Response) => {
        const data = req.body;

        res.status(204).json({
            status: 'success',
            message: 'User created successfully',
        });
    });
}

export const socialProfileController = new SocialProfileController();
