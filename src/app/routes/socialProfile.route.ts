import Router from 'express';
import { socialProfileController } from '@/app/controllers';

const router = Router();

router.post('/', socialProfileController.create);
router.get('/', socialProfileController.getAll);
router.get('/:id', socialProfileController.getById);
router.patch('/:id', socialProfileController.updateById);
router.delete('/:id', socialProfileController.deleteById);

export const socialProfileRoutes = router;
