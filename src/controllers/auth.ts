import { Request, Response } from 'express';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prisma } from '../lib/prisma';

export const authController = {
  async signIn(request: Request, response: Response) {
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

      const user = await prisma.user.findUnique({ where: { email: data.email } });

      if (!user) {
        return response.status(404).json({ error: 'The user was not found' });
      }

      const correctPassword = await bcrypt.compare(data.password, user.password);

      if (!correctPassword) {
        return response.status(401).json({ error: 'The password is incorrect' });
      }

      user.password = undefined!;

      const token = jwt.sign(user.id, process.env.JWT_SECRET!);

      return response.status(200).json({ user, token });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);

        return response.status(400).json({ error: validationError.details[0].message });
      }

      return response.status(500).json({ error: 'Internal server error' });
    }
  },

  async signUp(request: Request, response: Response) {
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

      const hash = await bcrypt.hash(data.password, 10);
      data.password = hash;

      const userExists = await prisma.user.findUnique({ where: { email: data.email } });

      if (userExists) {
        return response.status(409).json({ error: 'The user already exists' });
      }

      const user = await prisma.user.create({
        data,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          password: false,
          createdAt: true,
          updatedAt: true
        }
      });

      const token = jwt.sign(user.id, process.env.JWT_SECRET!);

      return response.status(200).json({ user, token });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);

        return response.status(400).json({ error: validationError.details[0].message });
      }

      return response.status(500).json({ error: 'Internal server error' });
    }
  }
};
