import db from "./db"; // Import the database pool

const seed = async () => {
    try {
        console.log("Starting database seeding...");

        // Create 'users' table
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
        const userResult = await db.query(
            `
            INSERT INTO users (email, username, password_hash)
            VALUES 
                ($1, $2, $3),
                ($4, $5, $6)
            RETURNING id;
            `,
            [
                "user1@example.com", "user1", "hashed_password1",
                "user2@example.com", "user2", "hashed_password2"
            ]
        );
        const [user1Id, user2Id] = userResult.rows.map(user => user.id);
        console.log("Inserted initial users:", user1Id, user2Id);

        // Create 'journal_entries' table
        await db.query(`
            CREATE TABLE IF NOT EXISTS journal_entries (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                mood VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Created 'journal_entries' table.");

        // Insert initial data into 'journal_entries' table
        await db.query(
            `
            INSERT INTO journal_entries (user_id, title, content, mood)
            VALUES 
                ($1, $2, $3, $4),
                ($5, $6, $7, $8),
                ($9, $10, $11, $12);
            `,
            [
                user1Id, "Feeling great!", "I had a wonderful day at work today!", "happy",
                user1Id, "Reflecting on life", "I've been thinking about my goals.", "thoughtful",
                user2Id, "Missing family", "I miss spending time with my family during the holidays.", "sad"
            ]
        );
        console.log("Inserted initial journal entries.");

        console.log("Database seeding completed.");
    } catch (err) {
        console.error("Error during seeding:", err);
    } finally {
        await db.end(); // Close the database connection
    }
};

seed();
