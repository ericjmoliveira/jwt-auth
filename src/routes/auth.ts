import { Router } from 'express';

export const authRoutes = Router();

authRoutes.post('/auth/signin', (request, response) => {
  return response.status(200).json({ message: 'Sign in route' });
});

authRoutes.post('/auth/signup', (request, response) => {
  return response.status(200).json({ message: 'Sign up route' });
});
