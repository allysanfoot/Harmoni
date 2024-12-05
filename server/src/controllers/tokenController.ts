import { generateAccessToken } from "../utils/tokens";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const refreshAccessToken = (req: Request, res: Response) => {
    const refreshToken = req.body.token;

    if (!refreshToken) return res.status(401).json({ error: "Refresh token required" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) return res.status(403).json({ error: "Invalid refresh token" });

        const accessToken = generateAccessToken({ id: user.id, username: user.username });
        res.json({ accessToken });
    });
};
