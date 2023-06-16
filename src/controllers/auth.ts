import { Request, Response } from 'express';

export const authController = {
  signIn(request: Request, response: Response) {
    return response.status(200).json({ message: 'Sign in route' });
  },

  signUp(request: Request, response: Response) {
    return response.status(200).json({ message: 'Sign up route' });
  }
};
