package DTO;


import model.Teacher;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
public record TeacherDTO(Long id, String name, List<ExerciseDTO> exercises) implements User {

    public TeacherDTO(Teacher t) {
        this(t.getId(), t.getName(), t.getExercises() != null ? t.getExercises().stream().map(ExerciseDTO::new).collect(Collectors.toList()) : new ArrayList<>());
    }
}