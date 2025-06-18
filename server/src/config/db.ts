// server/src/config/db.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {

      serverSelectionTimeoutMS: 9000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB;
