package kr.dgucaps.capsv4.domain.wiki.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class GetWikiHistoryResponse {

    private String title;

    private String content;

    private LocalDateTime time;

    private Writer writer;

    @Data
    @Builder
    public static class Writer {

        private Integer id;

        private Integer grade;

        private String name;
    }
}
