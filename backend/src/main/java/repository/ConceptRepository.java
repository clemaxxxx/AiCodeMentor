package repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import model.Concept;

import java.util.Optional;

@ApplicationScoped
public class ConceptRepository implements PanacheRepository<Concept> {

    /**
     * Finds a Concept entity by its unique theme name.
     * This method is crucial for the "Find or Create" logic in the ConceptService
     * to prevent concept duplication.
     * @param theme The theme string (e.g., "Recursion", "OOP").
     * @return An Optional containing the matching Concept, or empty if not found.
     */
    public Optional<Concept> findByTheme(String theme) {
        return find("theme", theme).firstResultOptional();
    }
}
