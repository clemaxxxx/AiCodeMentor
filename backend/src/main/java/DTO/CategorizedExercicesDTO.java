package DTO;

import java.util.List;

public record CategorizedExercicesDTO(String name, List<ExerciseDTO> exercises) {
}
