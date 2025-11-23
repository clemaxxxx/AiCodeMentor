package service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import model.Exercise;
import model.Teacher;
import repository.TeacherRepository;

import java.util.List;
import java.util.Optional;


/**
 * Service layer component responsible for handling business logic related to Teacher entities.
 * This service manages teacher creation, retrieval, and the "Find or Create" logic for login.
 */
@ApplicationScoped
public class TeacherService {

    @Inject
    TeacherRepository repository;

    /**
     * Creates and persists a new Teacher entity in the database.
     * @param t The Teacher entity to persist.
     * @return The persisted Teacher entity.
     */
    @Transactional
    public Teacher createTeacher(Teacher t) {
        repository.persist(t);
        return t;
    }

    /**
     * Retrieves all Teacher entities from the repository.
     * @return A List of all Teacher entities.
     */
    public List<Teacher> getAll() {
        return repository.listAll();
    }


    /**
     * Retrieves a single Teacher entity by ID and explicitly loads associated collections.
     * CRITICAL: This method forces the loading (eager fetching) of the Teacher's
     * Exercises and the Tests associated with those exercises, preventing
     * LazyInitializationExceptions in the Resource layer.
     * @param id The ID of the teacher.
     * @return The fully loaded Teacher entity, or null if not found.
     */
    @Transactional
    public Teacher getById(Long id) {
        var teacher = repository.findById(id);
        if (teacher == null) {
            return null;
        }
        if (teacher.getExercises() != null) {
            teacher.getExercises().size();
            for (Exercise exercise : teacher.getExercises()) {
                if (exercise.getTests() != null) {
                    exercise.getTests().size();
                }
            }
        }
        return teacher;
    }

    /**
     * Finds a Teacher entity by their username.
     * @param name The username to search for.
     * @return An Optional containing the Teacher if found, or empty otherwise.
     */
    public Optional<Teacher> findByName(String name){
        var teachers = getAll();
        return teachers.stream().filter( t -> name.equals(t.getName())).findAny();
    }

    /**
     * Implements the core "Find or Create" logic for teacher login/registration.
     * @param username The identifier used for login/creation.
     * @return The existing or newly created Teacher entity.
     */
    @Transactional
    public Teacher findOrCreateTeacher(String username) {
        var existingTeacher = findByName(username);
        if (existingTeacher.isPresent()) {
            return existingTeacher.get();
        } else {
            var newTeacher = new Teacher();
            newTeacher.setName(username);
            return createTeacher(newTeacher);
        }
    }

    /**
     * Retrieves the list of exercises created by a specific teacher.
     * @param id The ID of the teacher.
     * @return The list of Exercises associated with the teacher.
     */
    public List<Exercise> getAllExercisesByTeacherId(Long id) {
        var t = getById(id);
        return t.getExercises();
    }
}

