package repository;



import jakarta.enterprise.context.ApplicationScoped;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import model.Exercise;

@ApplicationScoped
public class ExerciceRepository implements PanacheRepository<Exercise> {


}
