package model;

import jakarta.persistence.*;

@Entity
public class ExampleSolution {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "example_seq_gen")
    @SequenceGenerator(name = "example_seq_gen", sequenceName = "example_seq", allocationSize = 1)
    private Long id;
    private String code;
    private String explication;

    public ExampleSolution() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getExplication() {
        return explication;
    }

    public void setExplication(String explication) {
        this.explication = explication;
    }
}
