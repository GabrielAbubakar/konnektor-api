import Router from 'express';
import { userController } from '@/app/controllers';

const router = Router();

router.get('/full-profile', userController.getFullProfile);
router.get('/:id/social-profiles', userController.getSocialProfiles);

export const userRoutes = router;
