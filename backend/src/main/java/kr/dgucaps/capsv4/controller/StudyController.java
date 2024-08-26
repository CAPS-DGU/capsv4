package kr.dgucaps.capsv4.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.dgucaps.capsv4.dto.request.CreateStudyRequest;
import kr.dgucaps.capsv4.dto.response.common.DataResponse;
import kr.dgucaps.capsv4.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Tag(name = "Study", description = "스터디 API")
public class StudyController {

    private final StudyService studyService;

    @PostMapping(value = "/study", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "스터디 생성", description = "파일 미포함시 '-' 표시 눌러 업로드칸 제거 후 Send empty value 체크 해제 해야합니다! (null이 아닌 빈 리스트)")
    @PreAuthorize("hasAnyRole('MEMBER', 'GRADUATE', 'COUNCIL', 'PRESIDENT', 'ADMIN')")
    public ResponseEntity<DataResponse> createStudy(@ModelAttribute CreateStudyRequest request) throws IOException {
        studyService.createStudy(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(DataResponse.builder().message("스터디 생성 성공").build());
    }

    @PostMapping("/study/apply/{studyId}")
    @Operation(summary = "스터디 지원")
    @PreAuthorize("hasAnyRole('MEMBER', 'GRADUATE', 'COUNCIL', 'PRESIDENT', 'ADMIN')")
    public ResponseEntity<DataResponse> applyStudy(@PathVariable("studyId") Integer studyId) {
        studyService.applyStudy(studyId);
        return ResponseEntity.ok(DataResponse.builder().message("스터디 지원 성공").build());
    }
}
