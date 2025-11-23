package DTO;



import model.Exercise;

import java.util.List;
import java.util.stream.Collectors;

public record ExerciseDTO(Long id, String title, String description, String statement, String difficulty, String teachername, List<TestsDTO> tests, ConceptDTO concept, ExampleSolutionDTO exemple) {
    public ExerciseDTO(Exercise e) {
        this(e.getId(),e.getTitle(), e.getDescription(), e.getStatement(),e.getDifficulty() != null ? e.getDifficulty().name() : null,e.getTeacher().getName(),
                e.getTests().stream().map(TestsDTO::new).collect(Collectors.toList()),e.getConcept() != null ? new ConceptDTO(e.getConcept()) : null,e.getExemple() != null ? new ExampleSolutionDTO(e.getExemple()) : null);

    }

}