package kr.dgucaps.capsv4.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import kr.dgucaps.capsv4.dto.request.ApplyEventRequest;
import kr.dgucaps.capsv4.dto.request.CreateEventRequest;
import kr.dgucaps.capsv4.dto.response.common.DataResponse;
import kr.dgucaps.capsv4.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "Event", description = "이벤트 API")
public class EventController {

    private final EventService eventService;

    @PostMapping("/event")
    @Operation(summary = "이벤트 생성")
    public ResponseEntity<DataResponse> createEvent(@RequestBody @Valid CreateEventRequest request) {
        eventService.createEvent(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(DataResponse.builder().message("이벤트 생성 성공").build());
    }

    @PostMapping("/event/apply")
    @Operation(summary = "이벤트 참여", description = "RequestBody의 quiz 예시에 알 수 없는 이유로 잘못된 형식이 나옵니다. (\"answer\": \"string\" 이 맞는 형식입니다!)")
    public ResponseEntity<DataResponse> applyEvent(@RequestBody @Valid ApplyEventRequest request) {
        eventService.createApply(request);
        return ResponseEntity.ok(DataResponse.builder().message("스터디 지원 성공").build());
    }
}
