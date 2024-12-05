import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.error("Missing or malformed Authorization header");
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded as {
            id: number;
            email: string;
            username: string;
            iat: number;
            exp: number;
        };
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err);
        res.status(401).json({ error: "Unauthorized" });
    }
};
