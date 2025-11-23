import type {CategorizedExercices  } from "../types/api";
const API_BASE_URL = '/concept';

export const fetchExercises = async (): Promise<CategorizedExercices[]> => {
     const response = await fetch(`${API_BASE_URL}`, {
         method: 'GET',
         headers: {'Content-Type': 'application/json',},
     });
     if (!response.ok) {
         const errorDetail = await response.text();
         throw new Error(`Erreur HTTP ${response.status}: ${errorDetail}`);
         }
     return response.json();

};