package model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Tests {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tests_seq_gen")
    @SequenceGenerator(name = "tests_seq_gen", sequenceName = "tests_seq", allocationSize = 1)
    private Long id;
    private String test;
    private String input;
    private String output;
    private String hint;

    @ManyToOne
    @JoinColumn(name = "exercise_id", referencedColumnName = "id")
    @JsonIgnore
    private Exercise exercise;

    public Tests() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }
}
