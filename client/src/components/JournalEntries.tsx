import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJournalEntries, deleteJournalEntry } from "../services/journalService";
import { JournalEntry } from "../types/JournalEntry";
import "../styles/JournalEntries.css";

const JournalEntries: React.FC<{ refreshTrigger: boolean }> = ({ refreshTrigger }) => {    const navigate = useNavigate();
    const [entries, setEntries] = useState<JournalEntry[]>([]);

    const fetchEntries = async () => {
        try {
            const data = await getJournalEntries();
            setEntries(data); // Update the entries with fetched data
        } catch (error) {
            console.error("Failed to fetch journal entries", error);
        }
    };
    
    // Fetch entries when the component mounts
    useEffect(() => {
        fetchEntries();
    }, [refreshTrigger]); // Re-fetch entries when `refreshTrigger` changes

    const handleDelete = async (id: number) => {
        try {
            await deleteJournalEntry(id);
            setEntries(entries.filter((entry) => entry.id !== id));
        } catch (error) {
            console.error("Failed to delete journal entry", error);
        }
    };

    const handleViewAnalysis = (id: number) => {
        navigate(`/journals/${id}`);
    }

    return (
        <div className="journal-entries">
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
                                <button onClick={() => handleViewAnalysis(entry.id)}>View Analysis</button>
                            </td>
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
