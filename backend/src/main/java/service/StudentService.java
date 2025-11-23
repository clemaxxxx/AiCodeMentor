package service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import model.Student;
import repository.StudentRepository;


import java.util.List;
import java.util.Optional;

/**
 * Service layer component responsible for handling business logic related to Student entities.
 */
@ApplicationScoped
public class StudentService {


    @Inject
    StudentRepository repository;

    /**
     * Retrieves all Student entities from the repository.
     * @return A List of all Student entities.
     */
    public List<Student> getAll() {
        return repository.listAll();
    }

    /**
     * Finds a Student entity by their username.
     * @param name The username to search for.
     * @return An Optional containing the Student if found, or empty otherwise.
     */
    private Optional<Student> findByName(String name){
        var students = getAll();
        return students.stream().filter( t -> t.getName().equals(name)).findAny();
    }

    /**
     * Creates and persists a new Student entity in the database.
     * @param s The Student entity to persist.
     * @return The persisted Student entity.
     */
    @Transactional
    public Student createStudent(Student s) {
        repository.persist(s);
        return s;
    }

    /**
     * Implements the core "Find or Create" logic for student login.
     * If a student with the given username exists, they are returned. Otherwise, a new student is created.
     * @param username The identifier used for login/creation.
     * @return The existing or newly created Student entity.
     */
    @Transactional
    public Student findOrCreateStudent(String username) {
        var existingStudent = findByName(username);
        if (existingStudent.isPresent()) {
            return existingStudent.get();
        } else {
            var newStudent = new Student();
            newStudent.setName(username);
            return createStudent(newStudent);
        }
    }


}
