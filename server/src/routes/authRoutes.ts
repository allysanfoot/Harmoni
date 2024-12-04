import { Router } from "express";
import passport from "passport";
import { registerUser, loginUser } from "../controllers/authController";
import { verifyJWT } from "../middleware/authMiddleware";
import pool from "../config/db";

const router = Router();
console.log("Auth routes initialized");

router.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users;");
        res.json(result.rows);
    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// Registration route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// TODO: Google OAuth routes
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
// router.get(
//     "/google/callback",
//     passport.authenticate("google", { failureRedirect: "/login" }),
//     googleOAuthCallback
// );

// Example of a protected route
router.get("/protected", verifyJWT, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

export default router;
