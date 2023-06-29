import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'The authorization header was not provided' });
  }

  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'The token was not provided' });
  }

  try {
    const secret = process.env.JWT_SECRET!;
    res.locals.payload = jwt.verify(token, secret);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
