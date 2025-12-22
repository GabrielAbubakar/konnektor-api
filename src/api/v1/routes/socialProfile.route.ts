import Router from 'express';
import { socialProfileController } from '@/api/v1/controllers/socialProfile.controller';
import { authMiddleware } from '@/api/middleware';

const router = Router();

router.post('/', authMiddleware.protect, socialProfileController.create);
router.get('/', authMiddleware.protect, socialProfileController.getAll);
router.get('/:id', authMiddleware.protect, socialProfileController.getById);
router.patch('/:id', authMiddleware.protect, socialProfileController.updateById);
router.delete('/:id', authMiddleware.protect, socialProfileController.deleteById);

export const socialProfileRoutes = router;
