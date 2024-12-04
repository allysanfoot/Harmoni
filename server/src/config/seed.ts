import db from "./db"; // Import the database pool

const seed = async () => {
    try {
        console.log("Starting database seeding...");

        // Create the 'users' table if it doesn't already exist
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                username VARCHAR(50) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Created 'users' table.");

        // Insert initial data into 'users' table
        await db.query(`
            INSERT INTO users (email, username, password_hash)
            VALUES ($1, $2, $3)
            ON CONFLICT (email) DO NOTHING
        `, ['test@gmail.com', 'testuser', 'hashed_password_example']);
        console.log("Seeded 'users' table.");

        // Create the 'journal_entries' table if it doesn't already exist
        await db.query(`
            CREATE TABLE IF NOT EXISTS journal_entries (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                mood VARCHAR(50),
                tags TEXT[], -- Array for storing tags
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);
        console.log("Created 'journal_entries' table.");

        // Insert initial data into 'journal_entries' table
        await db.query(`
            INSERT INTO journal_entries (user_id, title, content, mood, tags)
            VALUES 
            ($1, $2, $3, $4, $5),
            ($1, $6, $7, $8, $9)
        `, [
            1, // user_id
            "First Journal Entry", "This is my first journal entry.", "Happy", ['positive', 'first'],
            "Second Journal Entry", "This is my second journal entry.", "Reflective", ['thoughtful', 'reflection']
        ]);
        console.log("Seeded 'journal_entries' table.");

        console.log("Database seeding completed!");
    } catch (error) {
        console.error("Error during database seeding:", error);
    } finally {
        db.end(); // Close the database connection
    }
};

seed();
