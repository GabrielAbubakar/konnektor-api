import { type ICreateSocialProfileRequest } from '@/app/interfaces/requests';
import { SocialProfile } from '@/app/models';
import { AppError } from '@/app/utils';
import type { Types } from 'mongoose';

class SocialProfileService {
    create = async (data: ICreateSocialProfileRequest): Promise<any> => {
        // Implement create logic
        const res = await SocialProfile.create({ ...data, userId: data.userId });
        return res;
    };

    getAll = async (userId: Types.ObjectId): Promise<any[]> => {
        // Implement get all logic
        return await SocialProfile.find({ userId });
    };

    getById = async (id: string): Promise<any> => {
        // Implement get by id logic
        const result = await SocialProfile.findById(id);

        if (!result) {
            throw new AppError('Social profile not found', 404);
        }

        return;
    };

    updateById = async (
        id: string,
        userId: Types.ObjectId,
        data: Partial<ICreateSocialProfileRequest>
    ): Promise<any> => {
        // Implement update by id logic

        // check existence
        const profile = await SocialProfile.findById(id);
        if (!profile) {
            throw new AppError('Social profile not found', 404);
        }

        // check ownership
        if (profile.userId.toString() !== userId.toString()) {
            throw new AppError('You do not have permission to update this social profile', 403);
        }

        return await SocialProfile.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    };

    deleteById = async (id: string, userId: Types.ObjectId): Promise<void> => {
        // Implement delete by id logic

        // check existence
        const profile = await SocialProfile.findById(id);
        if (!profile) {
            throw new AppError('Social profile not found', 404);
        }

        // check ownership
        if (profile.userId.toString() !== userId.toString()) {
            throw new AppError('You do not have permission to update this social profile', 403);
        }

        await SocialProfile.findByIdAndDelete(id);
        return;
    };
}

export const socialProfileService = new SocialProfileService();
