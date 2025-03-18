package kr.dgucaps.capsv4.domain.study.dto;

import kr.dgucaps.capsv4.domain.study.entity.StudyApplyStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class GetStudyApplyListResponse {

    private Integer id;

    private User user;

    @Data
    @Builder
    public static class User {

        private Integer id;

        private Integer grade;

        private String name;
    }

    private LocalDateTime time;

    private StudyApplyStatus status;
}
