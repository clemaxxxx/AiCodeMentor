package LLMPayload;

import java.util.List;

public record AiGeneratedExercise(
        String title,
        String description,
        String statement,
        String difficulty,
        List<AiTest> tests,
        AiConcept concept,
        AiExampleSolution exemple
) {}