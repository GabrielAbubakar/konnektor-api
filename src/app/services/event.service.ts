import { HTTP_STATUS, RESPONSE_MESSAGES } from '@/app/constants';
import { Event, User } from '@/app/models';
import { AppError } from '@/app/utils/AppError';
import type { Types } from 'mongoose';
import mongoose from 'mongoose';

class EventService {
    // Implement event-related business logic here
    create = async (
        userId: Types.ObjectId,
        details: { title: string; description: string; date: Date }
    ) => {
        const res = await Event.create({
            createdBy: userId,
            ...details,
        });

        return res;
    };

    getAll = async (userId: Types.ObjectId) => {
        return await Event.find({ createdBy: userId });
    };

    getById = async (eventId: string) => {
        const result = await Event.findById(eventId);

        if (!result) {
            throw new AppError(RESPONSE_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        return result;
    };

    updateById = async (
        id: string,
        userId: Types.ObjectId,
        details: { title: string; description: string; date: Date }
    ) => {
        // check existence
        const event = await Event.findById(id);
        if (!event) {
            throw new AppError(RESPONSE_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        // check ownership
        if (event.createdBy.toString() !== userId.toString()) {
            throw new AppError(RESPONSE_MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
        }

        return await Event.findByIdAndUpdate(id, details, { new: true });
    };

    addKonnektion = async (id: string, userId: Types.ObjectId, konnection: string) => {
        // check existence
        const event = await Event.findById(id);
        if (!event) {
            throw new AppError(RESPONSE_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        // check ownership
        if (event.createdBy.toString() !== userId.toString()) {
            throw new AppError(RESPONSE_MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
        }

        //check valid mongo id for konnection could be added here
        if (!mongoose.Types.ObjectId.isValid(konnection)) {
            throw new AppError('Invalid konnection ID', HTTP_STATUS.BAD_REQUEST);
        }

        // check if id is a valid user
        const user = await User.findById(konnection);
        if (!user) {
            throw new AppError('User does not exist', HTTP_STATUS.NOT_FOUND);
        }

        return await Event.findByIdAndUpdate(
            id,
            { $addToSet: { konnektions: konnection } },
            { new: true }
        );
    };

    removeKonnektion = async (id: string, userId: Types.ObjectId, konnection: string) => {
        // check existence
        const event = await Event.findById(id);
        if (!event) {
            throw new AppError(RESPONSE_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        // check ownership
        if (event.createdBy.toString() !== userId.toString()) {
            throw new AppError(RESPONSE_MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
        }

        //check valid mongo id for konnection could be added here
        if (!mongoose.Types.ObjectId.isValid(konnection)) {
            throw new AppError('Invalid konnection ID', HTTP_STATUS.BAD_REQUEST);
        }

        return await Event.findByIdAndUpdate(
            id,
            { $pull: { konnektions: konnection } },
            { new: true }
        );
    };

    deleteById = async (id: string, userId: Types.ObjectId) => {
        // check existence
        const event = await Event.findById(id);
        if (!event) {
            throw new AppError(RESPONSE_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        // check ownership
        if (event.createdBy.toString() !== userId.toString()) {
            throw new AppError(RESPONSE_MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
        }

        return await Event.findByIdAndDelete(id);
    };
}

export const eventService = new EventService();
