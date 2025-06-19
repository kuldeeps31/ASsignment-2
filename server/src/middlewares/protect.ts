import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUser } from '../interfaces/IUser';

export interface AuthenticatedRequest extends Request {
  user?: IUser & { _id: string };
}

export const protect = async (
   req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response<any>> => {
  let token: string | undefined;
  if (req.headers.authorization?.startsWith('Bearer '))
    token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    console.log("Decoded JWT:", decoded);

    const user = await User.findById(decoded.id).select('-password');
    console.log("req.user:", user);
    if (!user) return res.status(401).json({ success: false, error: 'User not found' });
req.user = user as any;

    next();
  } catch (err) {
    console.error("Protect error:", err);
    res.status(401).json({ success: false, error: 'Not authorized' });
  }
};
