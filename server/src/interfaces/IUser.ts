import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  dob?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}