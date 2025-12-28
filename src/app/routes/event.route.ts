import Router from 'express';
import { eventController } from '@/app/controllers';

const router = Router();

router.post('/', eventController.create);
router.get('/', eventController.getAll);
router.get('/:id', eventController.getById);
router.patch('/:id', eventController.updateById);
router.patch('/:id/add-konnektion', eventController.addKonnektion);
router.patch('/:id/remove-konnektion', eventController.removeKonnektion);
router.delete('/:id', eventController.deleteById);

export const eventRoutes = router;
