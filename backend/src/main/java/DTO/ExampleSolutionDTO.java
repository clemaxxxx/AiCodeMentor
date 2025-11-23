package DTO;

import model.ExampleSolution;

public record ExampleSolutionDTO(Long id, String code, String explication) {
    public ExampleSolutionDTO(ExampleSolution es) {
        this(es.getId(), es.getCode(),es.getExplication());
    }
}