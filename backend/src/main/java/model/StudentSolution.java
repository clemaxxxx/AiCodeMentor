package model;

import jakarta.persistence.*;

@Entity
public class StudentSolution {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "student_solution_seq_gen")
    @SequenceGenerator(name = "student_solution_seq_gen", sequenceName = "student_solution_seq", allocationSize = 1)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    private Student student;

    private String solution;

    @ManyToOne
    @JoinColumn(name = "exercise_id", referencedColumnName = "id")
    private Exercise exercise;

    public StudentSolution() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

}
