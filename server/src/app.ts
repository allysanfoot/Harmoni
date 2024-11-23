import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import journalRoutes from "./routes/journalRoutes"

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/journals", journalRoutes);

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

export default app;
