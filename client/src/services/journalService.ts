import axios from "axios";
import { JournalEntry } from "../types/JournalEntry";

const API_URL = "/journals";

export const getJournalEntries = async (): Promise<JournalEntry[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createJournalEntry = async (data: Omit<JournalEntry, "id" | "createdAt">): Promise<JournalEntry> => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

export const updateJournalEntry = async (id: number, data: Partial<JournalEntry>): Promise<JournalEntry> => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

export const deleteJournalEntry = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
