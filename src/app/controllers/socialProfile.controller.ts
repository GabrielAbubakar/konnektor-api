import type { AuthenticatedRequest } from '@/app/middleware/auth.middleware';
import { socialProfileService } from '@/app/services';
import { AppError, catchAsync } from '@/app/utils';
import type { Response } from 'express';

class SocialProfileController {
    create = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
        const { platform, username, url } = req.body;
        const userId = req.user!._id;

        if (!platform || !url) {
            throw new AppError('Platform and URL are required', 400);
        }

        const result = await socialProfileService.create({
            platform,
            username,
            url,
            userId,
        });

        res.status(201).json({
            status: 'success',
            message: 'Social profile created successfully',
            data: result,
        });
    });

    getAll = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!._id;
        const result = await socialProfileService.getAll(userId);

        res.status(200).json({
            status: 'success',
            message: 'Social profiles retrieved successfully',
            data: result,
        });
    });

    getById = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.params;
        const result = await socialProfileService.getById(id!);

        res.status(200).json({
            status: 'success',
            message: 'Request Successful',
            data: result,
        });
    });

    updateById = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
        const { platform, username, url } = req.body;
        const { id } = req.params;
        const userId = req.user!._id;

        const result = await socialProfileService.updateById(id!, userId, {
            platform,
            username,
            url,
        });
        res.status(200).json({
            status: 'success',
            message: 'Social Profile updated successfully',
            data: result,
        });
    });

    deleteById = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.params;
        const userId = req.user!._id;

        await socialProfileService.deleteById(id!, userId);

        res.status(204).json({
            status: 'success',
            message: 'Social Profile deleted successfully',
        });
    });
}

export const socialProfileController = new SocialProfileController();
