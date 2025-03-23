package kr.dgucaps.capsv4.domain.file.service;

import jakarta.annotation.PostConstruct;
import kr.dgucaps.capsv4.domain.study.entity.Study;
import kr.dgucaps.capsv4.domain.file.entity.StudyFile;
import kr.dgucaps.capsv4.domain.file.repository.StudyFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StudyFileService {

    private final Path rootLocation = Paths.get("upload/study");

    private final StudyFileRepository studyFileRepository;

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage", e);
        }
    }

    @Transactional
    public StudyFile store(MultipartFile file, Study study) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String filename = UUID.randomUUID() + "-" + originalFilename;
        Files.copy(file.getInputStream(), this.rootLocation.resolve(filename));
        StudyFile studyFile = StudyFile.builder()
                .study(study)
                .title(originalFilename)
                .name(filename)
                .build();
        return studyFileRepository.save(studyFile);
    }
}
