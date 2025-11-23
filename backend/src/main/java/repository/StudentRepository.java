package repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import model.Student;

@ApplicationScoped
public class StudentRepository implements PanacheRepository<Student> {
}
