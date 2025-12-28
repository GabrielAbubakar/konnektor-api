import type { Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

export interface IEvent {
    _id: Types.ObjectId;
    createdBy: Types.ObjectId;
    title: string;
    description: string;
    date: Date;
    konnektions: Types.ObjectId[];
}
const EventSchema = new Schema<IEvent>(
    {
        title: { type: String, required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        description: { type: String },
        date: { type: Date },
        konnektions: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true,
    }
);

export const Event = mongoose.model<IEvent>('Event', EventSchema);
