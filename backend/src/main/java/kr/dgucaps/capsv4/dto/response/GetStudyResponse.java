package kr.dgucaps.capsv4.dto.response;

import kr.dgucaps.capsv4.entity.StudyDay;
import kr.dgucaps.capsv4.entity.StudySemester;
import kr.dgucaps.capsv4.entity.StudyType;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GetStudyResponse {

    private Integer id;

    private Boolean isDeleted;

    private User maker;

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

    private String description;

    private StudySemester semester;

    private String location;

    private StudyType type;

    private Integer maxParticipants;

    private List<User> participants;

    private List<File> files;

    @Data
    @Builder
    public static class File {

        private Integer fileId;

        private String url;

        private String title;
    }
}
