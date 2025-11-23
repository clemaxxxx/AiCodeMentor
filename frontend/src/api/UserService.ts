import type { UserLoginInput, UserLoginOutput } from "../types/api";

const API_BASE_URL = '/api';

export const upsertUser = async (input: UserLoginInput): Promise<UserLoginOutput> => {
  const response = await fetch(`${API_BASE_URL}/upsert-user`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(`Erreur HTTP ${response.status}: ${errorDetail}`);
  }
  return response.json();
};