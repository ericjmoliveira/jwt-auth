import { Router } from 'express';

import { authController } from '../controllers/auth';

export const authRoutes = Router();

authRoutes.post('/auth/signin', authController.signIn);

authRoutes.post('/auth/signup', authController.signUp);
