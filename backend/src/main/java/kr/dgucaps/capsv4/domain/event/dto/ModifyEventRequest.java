package kr.dgucaps.capsv4.domain.event.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ModifyEventRequest {

    @NotNull
    private Integer eventId;

    private String title;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private Integer maxParticipants;

    private String description;

    private Quiz quiz;

    @Data
    public static class Quiz {

        private String question;

        private String correctAnswer;
    }
}
