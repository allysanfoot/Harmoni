import axios from "axios";
import { Journal } from "../types/Journal";

const API_URL = "/api/journals";

export const getJournals = async (): Promise<Journal[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createJournal = async (data: Omit<Journal, "id" | "createdAt">): Promise<Journal> => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

export const updateJournal = async (id: number, data: Partial<Journal>): Promise<Journal> => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

export const deleteJournal = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
