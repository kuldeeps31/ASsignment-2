import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import session from 'express-session';
import passport from 'passport';        // ✅ package import
import './config/passport';             // ✅ side-effect import
import noteRoutes from './routes/noteRoutes'

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Session middleware
app.use(session({
  secret: "keyboard_cat",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send("Hello from Note-Taking API");
});


app.use('/api/notes', noteRoutes);
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
