package kr.dgucaps.capsv4.domain.event.dto;

import kr.dgucaps.capsv4.domain.event.entity.EventType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class GetEventResponse {

    private Integer id;

    private Writer writer;

    @Data
    @Builder
    public static class Writer {

        private Integer id;

        private Integer grade;

        private String name;
    }

    private EventType type;

    private String title;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private Integer maxParticipants;

    private String description;

    private Quiz quiz;

    @Data
    @Builder
    public static class Quiz {

        private String question;

        private String correctAnswer;
    }
}