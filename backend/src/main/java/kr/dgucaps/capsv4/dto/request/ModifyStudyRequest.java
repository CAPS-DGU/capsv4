package kr.dgucaps.capsv4.dto.request;

import kr.dgucaps.capsv4.entity.StudyDay;
import kr.dgucaps.capsv4.entity.StudyType;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ModifyStudyRequest {

    private String title;

    private String category;

    private String description;

    private StudyDay day;

    private String location;

    private StudyType type;

    private Integer maxParticipants;

    private List<MultipartFile> files;
}
