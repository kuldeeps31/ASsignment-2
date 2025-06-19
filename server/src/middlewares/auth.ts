import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUser } from '../interfaces/IUser';

export interface AuthenticatedRequest extends Request {
  user?: IUser & { _id: string };
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Not authorized to access this route',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
console.log("Decoded JWT:", decoded);
    req.user = await User.findById(decoded.id).select('-password') as IUser & { _id: string };
console.log("req.user:", req.user);
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Not authorized',
    });
  }
};
