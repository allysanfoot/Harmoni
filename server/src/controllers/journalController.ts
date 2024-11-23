import { Request, Response, NextFunction } from "express";
import pool from "../config/db";

export const getJournals = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await pool.query("SELECT * FROM journals");
        res.json(result.rows);
    } catch (err) {
        next(err); // Pass errors to the global error handler
    }
};

export const createJournal = async (req: Request, res: Response) => {
    const { userId, content, mood } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO journals (user_id, content, mood, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
            [userId, content, mood]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

export const updateJournal = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { content, mood } = req.body;
    try {
        const result = await pool.query(
            "UPDATE journals SET content = $1, mood = $2 WHERE id = $3 RETURNING *",
            [content, mood, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

export const deleteJournal = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query("DELETE FROM journals WHERE id = $1", [id]);
        res.json({ message: "Journal deleted" });

        if (result.rowCount === 0) {
            res.status(404).json({ message: "Journal not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};
