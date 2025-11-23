package ressource;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import service.ExerciseTestService;

@Path("/exec")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ExecutionResource {

    @Inject
    ExerciseTestService testService;


    @POST
    @Path("/{id}/submit")
    public Response submitCode(@PathParam("id") Long exerciseId, String code) {
        if (code == null) {
            return Response.status(400).entity("Code source manquant.").build();
        }
        System.out.println(code);
        var response = testService.runTests(exerciseId, code);
        return Response.ok(response).build();
    }
}
