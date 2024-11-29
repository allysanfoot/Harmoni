import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { verifyJWT } from "./middleware/authMiddleware";

// Routes
import journalRoutes from "./routes/journalRoutes"
import authRoutes from "./routes/authRoutes";

dotenv.config();

const cors = require("cors");
const app = express();

// Allow requests from your frontend
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Include credentials if needed
}));

// Middleware
app.use(express.json());

// Routes
app.use("/journals", verifyJWT, journalRoutes);
app.use("/auth", authRoutes);

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

export default app;
