import { Request, Response, NextFunction } from 'express';
import { Responses } from '../utils';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'JDRuy2Zv8JzEpAE06m66aDRU7JUd9p1u';

export const validateRegisterInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return Responses.ErrorBadRequest(res, new Error('All fields are required'));
  }

  if (password.length < 8) {
    return Responses.ErrorBadRequest(res, new Error('Password must be at least 8 characters'));
  }

  next();
};

export const validateLoginInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return Responses.ErrorBadRequest(res, new Error('Email and password are required'));
  }

  next();
};

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return Responses.ErrorBadRequest(res, new Error('Authorization token missing'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return Responses.ErrorBadRequest(res, new Error('Invalid or expired token'));
  }
};
