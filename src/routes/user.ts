import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth';
import { userController } from '../controllers/user';

export const userRoutes = Router();

userRoutes.get('/users', authMiddleware, userController.get);
