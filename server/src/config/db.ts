import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

console.log("Database URL:", process.env.DATABASE_URL);

pool.on("connect", () => {
    console.log("Connected to the database");
});

export default pool;
