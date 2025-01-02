package kr.dgucaps.capsv4.domain.study.dto;

import kr.dgucaps.capsv4.domain.study.entity.StudyDay;
import kr.dgucaps.capsv4.domain.study.entity.StudyType;
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
