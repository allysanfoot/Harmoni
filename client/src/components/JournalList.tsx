import React, { useEffect, useState } from "react";
import { getJournals } from "../services/journalService";
import { Journal } from "../types/Journal";

const JournalList: React.FC = () => {
    const [journals, setJournals] = useState<Journal[]>([]);

    useEffect(() => {
        const fetchJournals = async () => {
            const data = await getJournals();
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
