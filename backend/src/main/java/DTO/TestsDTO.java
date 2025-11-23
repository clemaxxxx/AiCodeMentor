package DTO;

import model.Tests;

public record TestsDTO(Long id, String test,String input, String output,String hint) {
    public TestsDTO(Tests t) {
        this(t.getId(),t.getTest(), t.getInput(), t.getOutput(),t.getHint());
    }
}