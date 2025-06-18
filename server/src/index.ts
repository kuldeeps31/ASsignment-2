import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Test Route
app.get('/', (req, res) => {
  res.send("Hello from Note-Taking API");
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
