// import { Schema } from 'mongoose';

import { Types } from 'mongoose';

export interface ICreateSocialProfileRequest {
    userId: Types.ObjectId;
    platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'github';
    username?: string;
    url: string;
}
