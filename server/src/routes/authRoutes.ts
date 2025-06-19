import express from "express";
import { signup,login } from "../controllers/authController";
import passport from 'passport';


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login); // ✅ This must exist


router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: "/login",
  session: false
}), (req, res) => {
  res.redirect("http://localhost:5173/dashboard");
});

  
    

export default router;