package kr.dgucaps.capsv4.controller;

import kr.dgucaps.capsv4.entity.UploadFile;
import kr.dgucaps.capsv4.repository.UploadFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.UriUtils;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
@RequiredArgsConstructor
@RequestMapping("/upload")
public class FileController {

    private final UploadFileRepository uploadFileRepository;

    @GetMapping("/file/{filename}")
    public ResponseEntity<Resource> downloadUploadFile(@PathVariable("filename") String filename) throws MalformedURLException {
        UploadFile uploadFile = uploadFileRepository.findByName(filename)
                .orElseThrow(() -> new IllegalStateException("파일을 찾을 수 없습니다"));
        String fileTitle = uploadFile.getTitle();
        Path filePath = Paths.get("upload/file").resolve(filename).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + UriUtils.encode(fileTitle, "UTF-8") + "\"").body(resource);
    }
}
