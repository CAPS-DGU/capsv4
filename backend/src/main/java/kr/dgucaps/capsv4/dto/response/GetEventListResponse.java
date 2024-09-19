package kr.dgucaps.capsv4.dto.response;

import kr.dgucaps.capsv4.entity.EventType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class GetEventListResponse {

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

    private Integer totalPages;
}
