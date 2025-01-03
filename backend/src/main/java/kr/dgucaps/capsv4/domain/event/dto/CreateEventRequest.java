package kr.dgucaps.capsv4.domain.event.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import kr.dgucaps.capsv4.domain.event.entity.EventType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateEventRequest {

    @NotNull
    private EventType type;

    @NotBlank
    private String title;

    @NotNull
    private LocalDateTime startDate;

    @NotNull
    private LocalDateTime endDate;

    @NotNull
    private Integer maxParticipants;

    @NotBlank
    private String description;

    private Quiz quiz;

    @Data
    public static class Quiz {

        private String question;

        private String correctAnswer;
    }
}
