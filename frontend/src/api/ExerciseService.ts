import type { DescriptionInput,RefineInput, ExerciseSummary,ExerciseResponse } from "../types/api";

const API_BASE_URL = '/api';

export const generateExercise = async (input: DescriptionInput): Promise<ExerciseResponse> => {
  const response = await fetch(`${API_BASE_URL}/transform`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(`Erreur HTTP ${response.status}: ${errorDetail}`);
  }

  return response.json();
};

export const refineExercise = async (payload: RefineInput): Promise<ExerciseResponse> => {
    const response = await fetch(`${API_BASE_URL}/transform/refine`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
};

const API_BASE_URL1 = '/exercices';

export const AppendExercise = async (input: ExerciseSummary): Promise<ExerciseSummary> => {
    const response = await fetch(`${API_BASE_URL1}/create`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(input),
    });

    if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Erreur HTTP ${response.status}: ${errorDetail}`);
    }
    return response.json();
};

export const deleteExercise = async (exerciseId: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL1}/${exerciseId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Échec de la suppression (HTTP ${response.status})`);
    }
};
