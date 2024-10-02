package kr.dgucaps.capsv4.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import kr.dgucaps.capsv4.dto.request.ApplyEventRequest;
import kr.dgucaps.capsv4.dto.request.CreateEventRequest;
import kr.dgucaps.capsv4.dto.request.GetEventListParameter;
import kr.dgucaps.capsv4.dto.request.ModifyEventRequest;
import kr.dgucaps.capsv4.dto.response.common.DataResponse;
import kr.dgucaps.capsv4.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.ok(DataResponse.builder().message("이벤트 참여 성공").build());
    }

    @GetMapping("/event")
    @Operation(summary = "이벤트 목록 조회")
    public ResponseEntity<DataResponse> getEventList(@ParameterObject GetEventListParameter parameter) {
        return ResponseEntity.ok(DataResponse.builder().message("이벤트 목록 조회 성공").data(eventService.getEventList(parameter)).build());
    }

    @GetMapping("/event/{eventId}")
    @Operation(summary = "이벤트 조회")
    public ResponseEntity<DataResponse> getEvent(@PathVariable Integer eventId) {
        return ResponseEntity.ok(DataResponse.builder().message("이벤트 조회 성공").data(eventService.getEvent(eventId)).build());
    }

    @GetMapping("/event/{eventId}/participants")
    @Operation(summary = "이벤트 참여자 조회")
    public ResponseEntity<DataResponse> getEventParticipants(@PathVariable Integer eventId) {
        return ResponseEntity.ok(DataResponse.builder().message("이벤트 참여자 조회 성공").data(eventService.getEventParticipants(eventId)).build());
    }

    @PatchMapping("/event")
    @Operation(summary = "이벤트 수정", description = "참여자 존재 시 불가능")
    public ResponseEntity<DataResponse> updateEvent(@RequestBody @Valid ModifyEventRequest request) {
        eventService.updateEvent(request);
        return ResponseEntity.ok(DataResponse.builder().message("이벤트 수정 성공").build());
    }

    @DeleteMapping("/event/{eventId}")
    @Operation(summary = "이벤트 삭제", description = "참여자 존재 시 불가능")
    public ResponseEntity<DataResponse> deleteEvent(@PathVariable Integer eventId) {
        eventService.deleteEvent(eventId);
        return ResponseEntity.ok(DataResponse.builder().message("이벤트 삭제 성공").build());
    }
}
