package DTO;

import LLMPayload.AiGeneratedExercise;

public record ExerciseResponse(String sessionId, AiGeneratedExercise exercise){

}