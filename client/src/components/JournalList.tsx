import React, { useEffect, useState } from "react";
import { getJournalEntries } from "../services/JournalService";
import { JournalEntry } from "../types/JournalEntry";

const JournalList: React.FC = () => {
    const [journals, setJournals] = useState<JournalEntry[]>([]);

    useEffect(() => {
        const fetchJournals = async () => {
            const data = await getJournalEntries();
            setJournals(data);
        };

        fetchJournals();
    }, []);

    return (
        <div>
            <h1>Journals</h1>
            <ul>
                {journals.map((journal) => (
                    <li key={journal.id}>
                        <strong>{journal.mood}</strong>: {journal.content} ({new Date(journal.createdAt).toLocaleDateString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JournalList;
