package model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "exercice_seq_gen")
    @SequenceGenerator(name = "exercice_seq_gen", sequenceName = "exercice_seq", allocationSize = 1)
    public Long id;

    private String title;
    private String description;
    private String statement;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    private List<Tests> tests;

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentSolution> studentSolutions;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "example_id", referencedColumnName = "id")
    private ExampleSolution exemple;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "concept_id", referencedColumnName = "id")
    private Concept concept;

    @ManyToOne
    @JoinColumn(name = "teacher_id", referencedColumnName = "id")
    private Teacher teacher;

    public Exercise() {
    }
    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatement() { return statement; }
    public void setStatement(String statement) { this.statement = statement; }

    public Difficulty getDifficulty() { return difficulty; }
    public void setDifficulty(Difficulty difficulty) { this.difficulty = difficulty; }

    public List<Tests> getTests() { return tests; }
    public void setTests(List<Tests> tests) { this.tests = tests; }

    public List<StudentSolution> getStudentSolutions() { return studentSolutions; }
    public void setStudentSolutions(List<StudentSolution> studentSolutions) { this.studentSolutions = studentSolutions; }

    public ExampleSolution getExemple() { return exemple; }
    public void setExemple(ExampleSolution exemple) { this.exemple = exemple; }

    public Concept getConcept() { return concept; }
    public void setConcept(Concept concept) { this.concept = concept; }

    public Teacher getTeacher() { return teacher;}
    public void setTeacher(Teacher teacher) {this.teacher = teacher;}

}
