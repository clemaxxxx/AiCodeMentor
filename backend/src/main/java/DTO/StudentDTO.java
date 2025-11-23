package DTO;

import model.Student;


public record StudentDTO(Long id, String name) implements User {
    public StudentDTO(Student s) {
        this(s.getId(), s.getName());
    }
}