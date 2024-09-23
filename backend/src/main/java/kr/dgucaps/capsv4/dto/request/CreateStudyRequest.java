package kr.dgucaps.capsv4.dto.request;

import kr.dgucaps.capsv4.entity.Study;
import kr.dgucaps.capsv4.entity.StudyDay;
import kr.dgucaps.capsv4.entity.StudyType;
import kr.dgucaps.capsv4.entity.User;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class CreateStudyRequest {

    private String title;

    private String category;

    private String description;

    private StudyDay day;

    private String location;

    private StudyType type;

    private Integer maxParticipants;

    private List<MultipartFile> files;

    public Study toEntity(User user) {
        return Study.builder()
                .user(user)
                .title(title)
                .category(category)
                .description(description)
                .day(day)
                .location(location)
                .type(type)
                .maxParticipants(maxParticipants)
                .build();
    }
}
