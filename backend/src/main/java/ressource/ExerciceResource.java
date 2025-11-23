package ressource;


import DTO.ExerciseDTO;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import model.Exercise;
import service.ExerciceService;

import java.util.List;


/**
 * REST Resource for managing the Exercises
 * This resource provides endpoints for viewing, creating, and deleting exercises.
 */
@Path("/exercices")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ExerciceResource {

    @Inject
    ExerciceService service;


    /**
     * Retrieves all  exercises in the BDD.
     * @return A List of all Exercise.
     */
    @GET
    @Transactional
    public List<Exercise> getAll() {
        return service.getAll();
    }


    /**
     * Retrieves a single exercise by it is id.
     * @param id The Long id of the exercise.
     * @return The Exercise found.
     * @throws NotFoundException if the exercise does not exist (returns HTTP 404).
     */
    @GET
    @Path("/{id}")
    public Exercise getById(@PathParam("id") Long id) {
        var exo = service.getById(id);
        if (exo == null) {
            throw new NotFoundException("Exercice non trouvé avec id " + id);
        }
        return exo;
    }


    /**
     * Deletes a specific exercise from the system using its id.
     * @param id The Long id of the exercise to be deleted.
     * @return HTTP 204 No Content on successful deletion.
     * @throws NotFoundException if the exercise ID does not exist.
     */
    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        var deleted = service.deleteExercice(id);
        if (!deleted) {
            throw new NotFoundException("Exercice non trouvé avec id " + id);
        }
        return Response.noContent().build();
    }


    /**
     * Creates a new programming exercise based on a provided ExerciceDTO.
     * @param creationDTO The ExerciseDTO containing the necessary data.
     * @return HTTP 201 CREATED Response with the saved Exercise mapped back to an ExerciseDTO.
     */
    @POST
    @Path("/create")
    public Response create(ExerciseDTO creationDTO) {
        var saved = service.createExercice(creationDTO);
        return Response.status(Response.Status.CREATED).entity(new ExerciseDTO(saved)).build();
    }


}
