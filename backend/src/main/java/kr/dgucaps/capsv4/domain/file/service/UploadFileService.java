package kr.dgucaps.capsv4.domain.file.service;

import jakarta.annotation.PostConstruct;
import kr.dgucaps.capsv4.domain.board.entity.Board;
import kr.dgucaps.capsv4.domain.board.entity.UploadFile;
import kr.dgucaps.capsv4.domain.file.repository.UploadFileRepository;
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
public class UploadFileService {

    private final Path rootLocation = Paths.get("upload/file");

    private final UploadFileRepository uploadFileRepository;

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage", e);
        }
    }

    @Transactional
    public UploadFile store(MultipartFile file, Board board) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String filename = UUID.randomUUID() + "-" + originalFilename;
        Files.copy(file.getInputStream(), this.rootLocation.resolve(filename));
        UploadFile uploadFile = UploadFile.builder()
                .board(board)
                .title(originalFilename)
                .name(filename)
                .build();
        return uploadFileRepository.save(uploadFile);
    }
}
