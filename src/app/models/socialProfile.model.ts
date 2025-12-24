import mongoose, { Schema, Types } from 'mongoose';
import { URL } from 'url';

export interface ISocialProfile {
    id: string;
    userId: Types.ObjectId;
    platform: string;
    username: string;
    url: string;
}

const socialProfileSchema = new Schema<ISocialProfile>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        platform: {
            type: String,
            enum: ['twitter', 'linkedin', 'instagram', 'facebook', 'github'],
            required: true,
        },
        username: { type: String, required: false },
        url: {
            type: String,
            required: true,
            validate: {
                validator: function (value: string) {
                    try {
                        new URL(value);
                        return true;
                    } catch {
                        return false;
                    }
                },
                message: 'Please provide a valid URL',
            },
        },
    },
    {
        timestamps: true,
    }
);

const SocialProfile = mongoose.model<ISocialProfile>('SocialProfile', socialProfileSchema);
export default SocialProfile;
