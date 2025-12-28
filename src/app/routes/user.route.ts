import Router from 'express';
import { authMiddleware } from '@/app/middleware';
import { userController } from '@/app/controllers';

const router = Router();

router.get('/full-profile', authMiddleware.protect, userController.getFullProfile);
router.get('/:id/social-profiles', authMiddleware.protect, userController.getSocialProfiles);

export const userRoutes = router;
