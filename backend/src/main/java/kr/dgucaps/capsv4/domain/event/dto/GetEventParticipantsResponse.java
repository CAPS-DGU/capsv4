package kr.dgucaps.capsv4.domain.event.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class GetEventParticipantsResponse {

    private Integer id;

    private User user;

    @Data
    @Builder
    public static class User {

        private Integer id;

        private Integer grade;

        private String name;
    }

    private LocalDateTime date;

    private Snack snack;

    @Data
    @Builder
    public static class Snack {

        private String phone;
    }

    private Quiz quiz;

    @Data
    @Builder
    public static class Quiz {

        private String answer;
    }
}
