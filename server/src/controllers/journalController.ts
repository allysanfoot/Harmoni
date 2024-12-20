import { Request, Response, NextFunction } from "express";
import pool from "../config/db";
import { User } from "../models/User";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

declare module 'express-serve-static-core' {
    interface Request {
        user?: User;
    }
}

// Fetch all journal entries for a specific user
export const getJournals = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    try {
        const result = await pool.query("SELECT * FROM journal_entries WHERE user_id = $1", [userId]);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

// Create a new journal entry
export const createJournal = async (req: Request, res: Response) => {
    const { title, content, mood, tags } = req.body;
    const userId = req.user?.id;

    console.log("User ID from JWT:", userId);
    console.log("Request Body:", req.body);

    if (!userId) {
        res.status(401).json({ error: "Unauthorized: Missing user ID" });
        return;
    }

    try {
        const result = await pool.query(
            `INSERT INTO journal_entries (user_id, title, content, mood, tags, created_at)
            VALUES ($1, $2, $3, $4, $5, NOW())
            RETURNING *`,
            [userId, title, content, mood, tags]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Update an existing journal entry
export const updateJournal = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, content, mood, tags } = req.body;
    try {
        const result = await pool.query(
            `UPDATE journal_entries 
            SET title = $1, content = $2, mood = $3, tags = $4 
            WHERE id = $5 
            RETURNING *`,
            [title, content, mood, tags, id]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ error: "Journal entry not found" });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a journal entry
export const deleteJournal = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query("DELETE FROM journal_entries WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            res.status(404).json({ error: "Journal entry not found" });
        } else {
            res.json({ message: "Journal entry deleted", entry: result.rows[0] });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a single journal entry by its ID
export const getJournalById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id; // Ensure only the logged-in user's journal entry is fetched

    try {
        const result = await pool.query(
            'SELECT * FROM journal_entries WHERE id = $1 AND user_id = $2',
            [id, userId]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Journal entry not found' });
            return;
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching journal entry:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getJournalAnalysis = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log("Fetching journal entry with ID:", id);

    try {
        // Fetch the journal entry from the database
        console.log("Fetching journal entry with ID:", id);
        const result = await pool.query("SELECT * FROM journal_entries WHERE id = $1", [id]);
        const entry = result.rows[0];

        if (!entry) {
            res.status(404).json({ error: "Journal entry not found" });
            return
        }

        // Generate the analysis using OpenAI
        const openaiResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a mental health coach." },
                { role: "user", content: `Title: ${entry.title}\nContent: ${entry.content}` },
            ],
        });
        const analysis = openaiResponse.choices[0].message.content;
        res.status(200).json({ entry, analysis });
    } catch (error) {
        if (error instanceof Error && (error as any).response) {
            console.error("OpenAI API error:", (error as any).response.data);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        console.error("Error generating analysis:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};