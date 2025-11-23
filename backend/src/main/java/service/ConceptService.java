package service;

import DTO.CategorizedExercicesDTO;
import DTO.ExerciseDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import model.Concept;
import repository.ConceptRepository;
import java.util.ArrayList;
import java.util.List;


/**
 * Service layer component responsible for handling business logic related to Concepts.
 * This includes fetching and structuring exercises based on the concepts they utilize.
 */
@ApplicationScoped
public class ConceptService {

    @Inject
    ConceptRepository conceptRepository;

    /**
     * Retrieves all Concept entities from the database.
     * @return A List of all Concept entities.
     */
    @Transactional
    public List<Concept> getAll(){
        return conceptRepository.listAll();
    }

    /**
     * Retrieves all exercises structured and categorized by their corresponding Concepts.
     * This method implements the specific business logic for the student catalog view.
     * @return A List of CategorizedExercicesDTO
     */
    @Transactional
    public List<CategorizedExercicesDTO> getExercisesByConcept(){
        var concepts = conceptRepository.listAll();
        var list = new ArrayList<CategorizedExercicesDTO>();
        for (Concept c : concepts) {
            var exercises = c.getExercises().stream().map(ExerciseDTO::new).toList();
            if(exercises.isEmpty()){
                list.add(new CategorizedExercicesDTO(c.getTheme(),new ArrayList<>()));
            }else {
                list.add(new CategorizedExercicesDTO(c.getTheme(), exercises));
            }
        }
        return list;
    }
}
