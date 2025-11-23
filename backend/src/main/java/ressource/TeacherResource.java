package ressource;


import DTO.ExerciseDTO;
import DTO.TeacherDTO;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import model.Teacher;
import service.TeacherService;


/**
 * REST Resource for managing Teachers and their exercises.
 * Defines endpoints for creation, retrieval, and access to a teacher's exercises.
 * The path for this resource is /api/teacher.
 */
@Path("api/teacher")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TeacherResource {

    @Inject
    TeacherService service;

    /**
     * Creates a new Teacher account in the system.
     * @param t The Teacher object received in the request body.
     * @return HTTP 201 CREATED Response with the created teacher's DTO.
     */
    @POST
    public Response create(Teacher t) {
        var saved = service.createTeacher(t);
        return Response.status(Response.Status.CREATED).entity(new TeacherDTO(saved)).build();
    }

    /**
     * Retrieves the information of a specific teacher by their unique id.
     * @param id The Long id of the teacher (provided in the URL path).
     * @return HTTP 200 OK Response with the TeacherDTO.
     * @throws NotFoundException if no teacher is found with the given ID (results in 404).
     */
    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        var teacher = service.getById(id);
        if (teacher == null) {
            throw new NotFoundException("Teacher not found with id " + id);
        }
        return Response.ok(new TeacherDTO(teacher)).build();
    }


    /**
     * Retrieves the list of all exercises created and owned by a given teacher.
     * @param teacherId The Long id of the teacher.
     * @return HTTP 200 OK Response with a list of ExerciseDTOs.
     */
    @GET
    @Path("/{id}/exercises")
    @Transactional
    public Response getAllExercises(@PathParam("id") Long teacherId) {
        var exercises = service.getAllExercisesByTeacherId(teacherId);
        var exDTO = exercises.stream().map(ExerciseDTO::new).toList();
        return Response.ok(exDTO).build();
    }
}
