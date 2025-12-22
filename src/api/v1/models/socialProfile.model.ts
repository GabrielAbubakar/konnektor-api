import mongoose, { Schema } from 'mongoose';

export interface ISocialProfile {
    id: string;
    userId: Schema.Types.ObjectId;
    platform: string;
    username: string;
    url: string;
}

const socialProfileSchema = new Schema<ISocialProfile>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        platform: { type: String, required: true },
        username: { type: String, required: true },
        url: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const SocialProfile = mongoose.model<ISocialProfile>('SocialProfile', socialProfileSchema);
export default SocialProfile;
