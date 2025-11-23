package ressource;


import DTO.CategorizedExercicesDTO;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import service.ConceptService;
import java.util.List;
/**
 * REST Resource responsible for providing categorized exercise data.
 * This resource is primarily used by the student frontend to display exercises
 * grouped by the required concepts (e.g., Arrays, Recursion, OOP).
 * The path is /api/concept.
 */
@Path("/concept")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ConceptResource {

    @Inject
    ConceptService service;

    /**
     * Retrieves all exercises, grouped and categorized by the core concepts
     * @return A List of CategorizedExercicesDTO, where each DTO represents a concept group.
     */
    @GET
    @Transactional
    public List<CategorizedExercicesDTO> getAll() {
        return service.getExercisesByConcept();
    }


}
