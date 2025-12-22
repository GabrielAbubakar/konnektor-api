import Router from 'express';
import { authController } from '@v1/controllers';
import { authMiddleware } from '@/api/middleware';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get(
    '/ping',
    // the protect middleware must come before restrictTo to ensure user details is added
    // to req object
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    authController.ping
);

export const authRoutes = router;
