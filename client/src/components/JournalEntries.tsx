import React, { useEffect, useState } from "react";
import { getJournalEntries, deleteJournalEntry } from "../services/journalService";
import { JournalEntry } from "../types/JournalEntry";

const JournalEntries: React.FC = () => {
    const [entries, setEntries] = useState<JournalEntry[]>([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const data = await getJournalEntries();
                setEntries(data);
            } catch (error) {
                console.error("Failed to fetch journal entries", error);
            }
        };
        fetchEntries();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteJournalEntry(id);
            setEntries(entries.filter((entry) => entry.id !== id));
        } catch (error) {
            console.error("Failed to delete journal entry", error);
        }
    };

    return (
        <div>
            <h2>Journal Entries</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Mood</th>
                        <th>Tags</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry: any) => (
                        <tr key={entry.id}>
                            <td>{entry.title}</td>
                            <td>{entry.content}</td>
                            <td>{entry.mood}</td>
                            <td>{entry.tags.join(", ")}</td>
                            <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleDelete(entry.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JournalEntries;
