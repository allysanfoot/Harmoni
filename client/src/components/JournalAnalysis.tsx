import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJournalEntryById, getJournalAnalysis } from "../services/journalService";
import { JournalEntry } from "../types/JournalEntry";
import "../styles/JournalAnalysis.css";

const JournalAnalysis = () => {
    const { id } = useParams<{ id: string }>();
    const [entry, setEntry] = useState<JournalEntry | null>(null);
    const [analysis, setAnalysis] = useState<string>("");

    const fetchJournalEntry = async () => {
        console.log("Fetching journal entry with ID:", id);
        try {
            const entry = await getJournalEntryById(Number(id));
            setEntry(entry);
        } catch (error) {
            console.error("Could not find entry", error);
        }
    }

    const fetchAnalysis = async () => {
        console.log("Fetching analysis for journal entry with ID:", id);
        try {
            const response = await getJournalAnalysis(Number(id));
            console.log("Analysis:", response);
            setAnalysis(response.analysis);
        } catch (error) {
            console.error("Could not find analysis", error);
        }
    };

    useEffect(() => {
        fetchJournalEntry();
        fetchAnalysis();
    }, [id]);

    if (!entry) return <p>Loading...</p>;

    return (
        <div className="test">
            {/* Display the journal entry */}
            <div className="entry">
                <h2>{entry.title}</h2>
                <p>{entry.content}</p>
                <p><strong>Mood:</strong> {entry.mood}</p>
                <div className="tags">
                    {entry.tags.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Display the analysis */}
            <div className="analysis">
                <h3>Analysis</h3>
                <p>{analysis}</p>
            </div>
        </div>
    );
};

export default JournalAnalysis;
