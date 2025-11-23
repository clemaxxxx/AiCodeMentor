package model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Concept {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "concept_seq_gen")
    @SequenceGenerator(name = "concept_seq_gen", sequenceName = "concept_seq", allocationSize = 1)
    private Long id;
    private String theme;


    @OneToMany(mappedBy = "concept", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Exercise> exercises = new ArrayList<>();

    public Concept() {}

    public Long getId() { return id; }

    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }

    public List<Exercise> getExercises() { return exercises; }
    public void setExercises(List<Exercise> exercises) { this.exercises = exercises; }
}
