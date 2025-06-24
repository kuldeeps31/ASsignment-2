import express from "express";
import { signup,login } from "../controllers/authController";
import passport from 'passport';
import { generateToken } from '../utils/generateToken'; 
import { IUser } from "../interfaces/IUser";
import { sign } from "crypto";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login); //  This must exist

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // req.user is set by Passport; cast to your User type
    const user = req.user as any;
    // Generate JWT containing at least the user id
    //const token = generateToken(user._id, user.name, user.email);
    const token = generateToken( user.name, user.email);
    // Redirect to React with token as `token` query‑param
    res.redirect(`http://localhost:5173/signup?token=${token}`);
  }
);


    

export default router;