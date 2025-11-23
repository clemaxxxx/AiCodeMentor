import type { ExerciseSummary } from "../types/api";
const API_BASE_URL = '/exercices';

export const fetchExercise = async (id : string): Promise<ExerciseSummary> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',},
    });
    if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Erreur HTTP ${response.status}: ${errorDetail}`);
     }
    return response.json();
};