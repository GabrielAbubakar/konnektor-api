import { HTTP_STATUS, RESPONSE_MESSAGES } from '@/app/constants';
import type { AuthenticatedRequest } from '@/app/middleware';
import { eventService } from '@/app/services';
import { catchAsync } from '@/app/utils';
import type { Response } from 'express';

class EventController {
    create = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
        // Implementation for creating an event
        const userId = req.user?._id; // assuming req.user is populated by auth middleware
        const { title, description, date } = req.body;

        const event = await eventService.create(userId!, { title, description, date });

        res.status(HTTP_STATUS.CREATED).json({
            status: 'success',
            message: RESPONSE_MESSAGES.CREATED,
            data: event,
        });
    });

    getAll = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user?._id;
        const events = await eventService.getAll(userId!);

        res.status(HTTP_STATUS.OK).json({
            status: 'success',
            message: RESPONSE_MESSAGES.FETCHED,
            data: events,
        });
    });

    getById = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.params;
        const event = await eventService.getById(id!);

        res.status(HTTP_STATUS.OK).json({
            status: 'success',
            message: RESPONSE_MESSAGES.FETCHED,
            data: event,
        });
    });

    updateById = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.params;
        const userId = req.user?._id;
        const { title, description, date } = req.body;
        // Implementation for updating an event by ID

        const result = await eventService.updateById(id!, userId!, { title, description, date });

        res.status(HTTP_STATUS.OK).json({
            status: 'success',
            message: RESPONSE_MESSAGES.UPDATED,
            data: result, // replace with updated event data
        });
    });

    addKonnektion = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user?._id;
        const { id } = req.params;
        const { konnection } = req.body;

        const result = await eventService.addKonnektion(id!, userId!, konnection!);

        res.status(HTTP_STATUS.OK).json({
            status: 'success',
            message: 'Konnektion added successfully',
            data: result,
        });
    });

    removeKonnektion = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user?._id;
        const { id } = req.params;
        const { konnection } = req.body;

        const result = await eventService.removeKonnektion(id!, userId!, konnection!);

        res.status(HTTP_STATUS.OK).json({
            status: 'success',
            message: 'Konnektion removed successfully',
            data: result,
        });
    });

    deleteById = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user?._id;
        const { id } = req.params;

        await eventService.deleteById(id!, userId!);

        res.status(HTTP_STATUS.NO_CONTENT).json({
            status: 'success',
            message: 'Event deleted successfully',
        });
    });
}

export const eventController = new EventController();
