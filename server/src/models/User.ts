// src/models/User.ts
import mongoose, { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  dob: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = model<IUser>('User', userSchema);
export default User;
