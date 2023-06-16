import { Request, Response } from 'express';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export const authController = {
  signIn(request: Request, response: Response) {
    const body = request.body;
    const schema = z.object({
      email: z
        .string({ required_error: 'The email is required' })
        .email({ message: 'The email format is invalid' }),
      password: z
        .string({ required_error: 'The password is required' })
        .min(6, 'The password must contain at least 6 characters')
    });

    try {
      const data = schema.parse(body);

      return response.status(200).json({ message: 'OK' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);

        return response.status(400).json({ error: validationError.details[0].message });
      }

      return response.status(500).json({ error: 'Internal server error' });
    }
  },

  signUp(request: Request, response: Response) {
    const body = request.body;
    const schema = z.object({
      firstName: z
        .string({ required_error: 'The first name is required' })
        .min(2, 'The first name must contain at least two characters'),
      lastName: z
        .string({ required_error: 'The last name is required' })
        .min(2, 'The last name must contain at least two characters'),
      email: z
        .string({ required_error: 'The email is required' })
        .email({ message: 'The email format is invalid' }),
      password: z
        .string({ required_error: 'The password is required' })
        .min(6, 'The password must contain at least 6 characters')
    });

    try {
      const data = schema.parse(body);

      return response.status(200).json({ message: 'OK' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);

        return response.status(400).json({ error: validationError.details[0].message });
      }

      return response.status(500).json({ error: 'Internal server error' });
    }
  }
};
