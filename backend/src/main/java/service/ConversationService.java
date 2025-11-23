package service;

import jakarta.enterprise.context.ApplicationScoped;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@ApplicationScoped
public class ConversationService {

    private final Map<String, StringBuilder> sessions = new ConcurrentHashMap<>();

    private static final String PROMPT = """
        Tu es un expert en création d'exercices de programmation Java.
        
        RÈGLES STRICTES DE SORTIE :
        1. Réponds UNIQUEMENT avec un JSON valide.
        2. PAS de texte avant (comme "Voici le JSON"), PAS de texte après.
        3. PAS de balises Markdown (```json).
        4. Pour les Test tu dois en mettre au moins 2 test et ce sont des test en JUnit5
        5. Dans description fait un vrai enonce pour un eleve
        6. Dans statement j'aimerai une classe et ses import si il y en a dont la fonction a besoin
        
        STRUCTURE DU JSON ATTENDUE :
        {
            "title": "Titre",
            "description": "Enoncé clair...",
            "statement": "import java.util.*;public class Solution {public static int add(int a, b){}}",
            "difficulty": "Choisit un entre (L1,L2,L3,M1,M2)",
            "tests": [
                {
                    "test": "@Test void test(){ ici ecrire un test en Junit5 }",
                    "input": "desc entrée",
                    "output": "desc sortie",
                    "hint": "indice"
                }
            ],
            "concept": { "theme": "Boucles" },
            "exemple": { "code": "ici ecrire un code de solution", "explication": "..." }
        }
        """;

    public String startSession() {
        var sessionId = UUID.randomUUID().toString();
        sessions.put(sessionId, new StringBuilder(PROMPT));
        return sessionId;
    }

    public void addUserMessage(String sessionId, String message) {
        if (!sessions.containsKey(sessionId)) throw new RuntimeException("Session inconnue");
        var history = sessions.get(sessionId);
        history.append("\n\nUser: ").append(message);
        history.append("\nAssistant (JSON):");
    }

    public void addAiResponse(String sessionId, String response) {
        if (sessions.containsKey(sessionId)) {
            sessions.get(sessionId).append(response);
        }
    }

    public String getFullHistory(String sessionId) {
        return sessions.get(sessionId).toString();
    }

    public boolean exists(String sessionId) {
        return sessions.containsKey(sessionId);
    }

}
