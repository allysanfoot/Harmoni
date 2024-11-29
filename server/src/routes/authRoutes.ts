import { Router } from "express";
import passport from "passport";
import { registerUser, loginUser, googleOAuthCallback } from "../controllers/authController";

const router = Router();

// Registration route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    googleOAuthCallback
);

export default router;
