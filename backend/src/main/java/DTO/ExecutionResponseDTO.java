package DTO;

import java.util.List;

public record ExecutionResponseDTO(List<TestResultDTO> results, boolean allPassed) {
}
