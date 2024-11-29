import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db";

const JWT_SECRET = "your-secret-key"; // Use a strong secret key and store it in .env

// User Registration
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, username, password } = req.body;

    try {
        // Check if email or username already exists
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1 OR username = $2", [email, username]);
        if (userExists.rows.length > 0) {
            res.status(400).json({ error: "Email or username already exists" });
            return;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user into the database
        await pool.query(
            "INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3)",
            [email, username, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// User Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            res.status(404).json({ error: "User not found" });
            return
        }

        // Validate the password
        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!validPassword) {
            res.status(401).json({ error: "Invalid password" });
            return
        }

        // Generate a JWT
        const token = jwt.sign({ id: user.rows[0].id, email: user.rows[0].email }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// OAuth Callback (Google OAuth example)
export const googleOAuthCallback = async (req: Request, res: Response) => {
    try {
        const { email, name } = req.user as { email: string; name: string };

        // Check if the user already exists
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            // Register new user
            await pool.query("INSERT INTO users (email, username) VALUES ($1, $2)", [email, name]);
        }

        // Generate a JWT
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

        res.redirect(`/auth/success?token=${token}`); // Redirect with token
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
