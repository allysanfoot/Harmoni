import React, { useState } from "react";
import { createJournalEntry } from "../services/journalService";
import "../styles/JournalEntryForm.css";

const JournalEntryForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await createJournalEntry({ title, content, mood, tags });
            setMessage("Journal entry created successfully!");
            console.log("Response:", response);

            // Reset form fields
            setTitle("");
            setContent("");
            setMood("");
            setTags([]);
            setTagInput("");
        } catch (error) {
            setMessage("Failed to create journal entry.");
            console.error(error);
        }
    };

    const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput.trim() !== "") {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
            e.preventDefault();
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <form className="journal-entry-form" onSubmit={handleSubmit}>
            {message && <p className="message">{message}</p>}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Type your text here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            <div className="form-row">
                <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    required
                >
                    <option value="" disabled>
                        Select mood
                    </option>
                    <option value="Happy">Happy</option>
                    <option value="Sad">Sad</option>
                    <option value="Excited">Excited</option>
                    <option value="Anxious">Anxious</option>
                    <option value="Angry">Angry</option>
                </select>
                <div className="tags-container">
                    <input
                        type="text"
                        placeholder="Add tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyPress}
                    />
                    <div className="tags">
                        {tags.map((tag, index) => (
                            <span key={index} className="tag">
                                {tag}{" "}
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <button type="submit" className="submit-button">
                Submit
            </button>
        </form>
    );
};

export default JournalEntryForm;
