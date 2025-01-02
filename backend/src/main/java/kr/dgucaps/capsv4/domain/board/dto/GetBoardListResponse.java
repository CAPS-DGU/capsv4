package kr.dgucaps.capsv4.domain.board.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class GetBoardListResponse {

    private Integer id;

    private Writer writer;

    @Data
    @Builder
    public static class Writer {

        private Integer id;

        private Integer grade;

        private String name;
    }

    private Integer category;

    private String title;

    private LocalDateTime time;

    private Integer hit;

    private Integer comments;

    private Integer likes;

    private Integer totalPages;
}

