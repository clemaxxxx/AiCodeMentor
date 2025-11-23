package service;

import DTO.ExecutionResponseDTO;
import DTO.TestResultDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import repository.ExerciceRepository;

import java.util.ArrayList;

@ApplicationScoped
public class ExerciseTestService {
    @Inject
    ExerciceRepository exerciseRepository;

    //Mettre en place l'execution du code java puis recup la rep
    public ExecutionResponseDTO runTests(Long exerciseId, String studentCode) {
        var list = new ArrayList<TestResultDTO>();
        return new ExecutionResponseDTO(list,true);
    };
}
