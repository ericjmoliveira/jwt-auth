import { Request, Response } from 'express';

import { prisma } from '../lib/prisma';

export const userController = {
  async get(req: Request, res: Response) {
    console.log(res.locals.payload);

    const id = res.locals.payload.id;

    try {
      const user = await prisma.user.findFirst({
        where: { id },
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

      return res.status(200).json({ user: user });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};
