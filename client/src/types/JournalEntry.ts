export interface JournalEntry {
    id: number;             // Unique identifier for the journal entry
    userId: number;         // ID of the user who created the entry
    title: string;          // Title of the journal entry
    content: string;        // Content of the journal entry
    mood: string | null;    // Mood of the entry (nullable, in case it's not set)
    tags: string[];         // Array of tags associated with the entry
    createdAt: string;      // Timestamp of when the entry was created
}
