import { HTTP_STATUS, RESPONSE_MESSAGES } from '@/app/constants';
import type { AuthenticatedRequest } from '@/app/middleware';
import { socialProfileService } from '@/app/services';
import { catchAsync } from '@/app/utils';
import type { Response } from 'express';
import type { Types } from 'mongoose';

class UserController {
    getSocialProfiles = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.params.id;
        const profiles = await socialProfileService.getAll(userId as unknown as Types.ObjectId);

        res.status(HTTP_STATUS.OK).json({
            status: 'success',
            message: RESPONSE_MESSAGES.FETCHED,
            data: profiles,
        });
    });
}

export const userController = new UserController();
