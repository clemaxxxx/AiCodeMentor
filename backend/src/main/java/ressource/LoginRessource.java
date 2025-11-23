package ressource;

import DTO.LoginInput;
import DTO.LoginOutput;
import DTO.StudentDTO;
import DTO.TeacherDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import service.StudentService;
import service.TeacherService;

/**
 * REST Resource handling the simplified user login/registration process.
 * It finds an existing user or creates a new one based on the provided username and role.
 * The path is /api/upsert-user.
 */
@Path("api/upsert-user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LoginRessource {

    @Inject
    TeacherService teacherService;

    @Inject
    StudentService studentService;

    /**
     * Handles the login or creation of a user (Teacher or Student).
     * This method implements the "upsert" logic: Find or Create.
     * @param input A LoginInput DTO containing the username and desired role ("teacher" or "student").
     * @return HTTP 200 OK Response with the LoginOutput DTO, including user data and a token.
     */
    @POST
    public Response handleLogin(LoginInput input) {
        if (input.username() == null || input.username().trim().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Username cannot be empty.").build();
        }
        if(input.role().equals("teacher")) {
            var teacher = teacherService.findOrCreateTeacher(input.username().trim());
            var teacherDTO = new TeacherDTO(teacher);
            var token = "tokenT-for-" + teacher.getName();
            return Response.ok().entity(new LoginOutput(teacherDTO,"teacher",token)).build();
        }else{
            var student = studentService.findOrCreateStudent(input.username().trim());
            var studentDTO = new StudentDTO(student);
            var token = "tokenS-for-" + student.getName();
            return Response.ok().entity(new LoginOutput(studentDTO,"student",token)).build();
        }
    }
}
