import pool from "./db";

const seed = async () => {
    try {
        console.log("Starting database seeding...");

        // Create a test user
        const userResult = await pool.query(
            "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id",
            ["test_user@example.com", "hashed_password"]
        );
        const userId = userResult.rows[0].id;

        console.log(`Inserted user with ID: ${userId}`);

        // Create test journals for the user
        await pool.query(
            "INSERT INTO journals (user_id, content, mood) VALUES ($1, $2, $3)",
            [userId, "Today was a good day", "happy"]
        );
        await pool.query(
            "INSERT INTO journals (user_id, content, mood) VALUES ($1, $2, $3)",
            [userId, "Feeling a bit down", "sad"]
        );

        console.log("Inserted journal entries for user.");
        console.log("Database seeding completed.");
    } catch (err) {
        console.error("Error during seeding:", err);
    } finally {
        pool.end(); // Close the database connection
    }
};

seed();
