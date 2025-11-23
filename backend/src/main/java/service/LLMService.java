package service;

import DTO.ExerciseResponse;
import LLMPayload.AiGeneratedExercise;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;


/**
 * Service layer responsible for LLM interaction, including
 * prompt engineering, response sanitization, and mapping the raw text response
 * into AiGeneratedExercise.
 */
@ApplicationScoped
public class LLMService {

    @Inject
    LlamaCppService llamaEngine;

    @Inject
    ConversationService conversationService;




    public ExerciseResponse startExercise(String specification) {
        var sessionId = conversationService.startSession();
        return processInteraction(sessionId, "Génère un exercice sur : " + specification);
    }

    public ExerciseResponse refineExercise(String sessionId, String instruction) {
        if (!conversationService.exists(sessionId)) {
            return startExercise(instruction);
        }
        return processInteraction(sessionId, "Modifie l'exercice précédent. Consigne : " + instruction);
    }

    private ExerciseResponse processInteraction(String sessionId, String userMessage) {
        var objectMapper = new ObjectMapper();
        conversationService.addUserMessage(sessionId, userMessage);
        var fullPrompt = conversationService.getFullHistory(sessionId);
        var rawResponse = llamaEngine.generateExercise(fullPrompt);
        conversationService.addAiResponse(sessionId, rawResponse);
        var cleanJson = cleanJson(rawResponse);
        try {
            objectMapper.configure(com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            var exo = objectMapper.readValue(cleanJson, AiGeneratedExercise.class);
            return new ExerciseResponse(sessionId, exo);
        } catch (Exception e) {
            System.err.println("❌ JSON Invalide reçu :\n" + cleanJson);
            throw new RuntimeException("Le LLM a généré un JSON invalide.", e);
        }
    }

    /**
     * method to clean up the raw LLM response by removing common artifacts
     * like Markdown fences (```json) and leading/trailing conversational text.
     * @param response The raw text output from the LLM.
     * @return The sanitized, pure JSON string.
     */
    private String cleanJson(String response) {
        var result = response.trim();
        if (result.startsWith("```json")) {
            result = result.substring(7);
        } else if (result.startsWith("```")) {
            result = result.substring(3);
        }
        if (result.endsWith("```")) {
            result = result.substring(0, result.length() - 3);
        }
        var firstBrace = result.indexOf("{");
        var lastBrace = result.lastIndexOf("}");
        if (firstBrace != -1 && lastBrace != -1) {
            result = result.substring(firstBrace, lastBrace + 1);
        }
        return result.trim();
    }
}