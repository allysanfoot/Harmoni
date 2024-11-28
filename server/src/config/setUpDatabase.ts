import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createDatabase = async () => {
    try {
        const adminPool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });

        await adminPool.query(`CREATE DATABASE harmoni;`);
        console.log("Created 'harmoni' database.");
        await adminPool.end();
    } catch (error) {
        console.error("Error creating the database (it might already exist):", error);
    }
};

// Call createDatabase first, then create tables
const setup = async () => {
    await createDatabase();
};

setup();
