package kr.dgucaps.capsv4.domain.board.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class GetBoardResponse {

    private Integer id;

    private Writer writer;

    @Data
    @Builder
    public static class Writer {

        private Integer id;

        private Integer grade;

        private String name;
    }

    private Boolean isDeleted;

    private Boolean isModified;

    private Integer category;

    private String title;

    private LocalDateTime time;

    private Integer hit;

    private String content;

    private Integer like;

    private List<Comment> comments;

    @Data
    @Builder
    public static class Comment {

        private Integer id;

        private Writer writer;

        private Boolean isDeleted;

        private Integer targetId;

        private String content;

        private LocalDateTime time;

        private List<Comment> comments;
    }

    private List<File> files;

    @Data
    @Builder
    public static class File {

        private Integer fileId;

        private String url;

        private String title;
    }
}
