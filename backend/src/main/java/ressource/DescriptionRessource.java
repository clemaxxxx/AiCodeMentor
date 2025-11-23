package ressource;

import DTO.*;
import LLMPayload.AiGeneratedExercise;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import service.LLMService;


/**
 * REST Resource responsible for generate exercises.
 * descriptions into structured, AI-generated exercise content via the LLM Service.
 * The path is /api/transform.
 */
@Path("/api/transform")
public class DescriptionRessource {
    @Inject
    LLMService llmService;

    /**
     * Accepts a description from the teacher and calls the LLM
     * to generate the full exercise content.
     * @param input A DTO (DescriptionInput) containing the teacher's text specification.
     * @return An AiGeneratedExercise DTO/Record containing the structured output from the LLM.
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ExerciseResponse createExercise(DescriptionInput input) {
        return llmService.startExercise(input.description());
    }

    @POST
    @Path("/refine")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ExerciseResponse refineExercise(RefineInput input) {
        return llmService.refineExercise(input.sessionId(), input.instruction());
    }
}
