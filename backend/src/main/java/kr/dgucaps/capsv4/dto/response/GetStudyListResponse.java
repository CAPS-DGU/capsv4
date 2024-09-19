package kr.dgucaps.capsv4.dto.response;

import kr.dgucaps.capsv4.entity.StudyDay;
import kr.dgucaps.capsv4.entity.StudySemester;
import kr.dgucaps.capsv4.entity.StudyType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetStudyListResponse {

    private Integer id;

    private User user;

    @Data
    @Builder
    public static class User {

        private Integer id;

        private Integer grade;

        private String name;
    }

    private String title;

    private Integer year;

    private StudyDay day;

    private String category;

    private StudySemester semester;

    private Integer participants;

    private Integer maxParticipants;

    private StudyType type;
}
