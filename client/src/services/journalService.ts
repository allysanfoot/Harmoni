import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
};

// Add a new journal entry
export const createJournalEntry = async (data: {
    title: string;
    content: string;
    mood: string;
    tags: string[];
}) => {
    const response = await axios.post(`${API_BASE_URL}/journals`, data, config);
    return response.data;
};

// Get all journal entries
export const getJournalEntries = async () => {
    const response = await axios.get(`${API_BASE_URL}/journals`, config);
    return response.data;
};

// Get a specific journal entry
export const getJournalEntryById = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/journals/${id}`, config);
    return response.data; // The journal entry
};

// Update a journal entry
export const updateJournalEntry = async (
    id: number,
    data: { title: string; content: string; mood: string; tags: string[] }
) => {
    const response = await axios.put(`${API_BASE_URL}/journals/${id}`, data, config);
    return response.data;
};

// Delete a journal entry
export const deleteJournalEntry = async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/journals/${id}`, config);
    return response.data;
};

// Get analysis for a specific journal entry
export const getJournalAnalysis = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/journals/${id}/analysis`, config);
    return response.data;
};

