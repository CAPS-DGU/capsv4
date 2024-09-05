package kr.dgucaps.capsv4.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
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
}
