
import type {ExecutionResponse } from "../types/api"

export const SubmitStudentSolution = async (exerciseId: string, code: string) : Promise<ExecutionResponse> =>{
    const response = await fetch(`/exec/${exerciseId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
    });
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Erreur HTTP ${response.status}: ${error}`);
    }
    return response.json();
};