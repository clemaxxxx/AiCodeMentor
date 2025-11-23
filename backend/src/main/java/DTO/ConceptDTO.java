package DTO;

import model.Concept;

public record ConceptDTO(Long id, String theme) {
    public ConceptDTO(Concept c) {
        this(c.getId(), c.getTheme());
    }
}