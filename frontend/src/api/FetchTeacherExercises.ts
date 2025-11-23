
import type { ExerciseSummary } from "../types/api";
const API_BASE_URL = '/api';

export const fetchTeacherExercises = async (teacherId : string): Promise<ExerciseSummary[]> => {
    if (!teacherId) {
        throw new Error("Authentification requise : Token ou ID du professeur manquant.");
    }

    const response = await fetch(`${API_BASE_URL}/teacher/${teacherId}/exercises`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',},
    });
    if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Erreur HTTP ${response.status}: ${errorDetail}`);
     }
    return response.json();
};