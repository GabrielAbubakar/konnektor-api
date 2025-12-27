import Router from 'express';
import { eventController } from '@/app/controllers';
import { authMiddleware } from '@/app/middleware';

const router = Router();

router.post('/', authMiddleware.protect, eventController.create);
router.get('/', authMiddleware.protect, eventController.getAll);
router.get('/:id', authMiddleware.protect, eventController.getById);
router.patch('/:id', authMiddleware.protect, eventController.updateById);
router.patch('/:id/add-konnektion', authMiddleware.protect, eventController.addKonnektion);
router.patch('/:id/remove-konnektion', authMiddleware.protect, eventController.removeKonnektion);
router.delete('/:id', authMiddleware.protect, eventController.deleteById);

export const eventRoutes = router;
