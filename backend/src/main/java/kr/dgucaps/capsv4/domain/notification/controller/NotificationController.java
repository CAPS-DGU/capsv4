package kr.dgucaps.capsv4.domain.notification.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.dgucaps.capsv4.global.DataResponse;
import kr.dgucaps.capsv4.domain.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Controller;

@Controller
@RequiredArgsConstructor
@Tag(name = "Notification", description = "알림 API")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/notification/status")
    @Operation(summary = "알림 여부")
    public ResponseEntity<DataResponse> getNotificationStatus(String userId) {
        return ResponseEntity.ok(DataResponse.builder().message("알림 여부 조회 성공").data(notificationService.getNotificationStatus(userId)).build());
    }
    
    @GetMapping("/notification")
    @Operation(summary = "알림 조회")
    public ResponseEntity<DataResponse> getNotification(String userId) {
        return ResponseEntity.ok(DataResponse.builder().message("알림 조회 성공").data(notificationService.getNotification(userId)).build());
    }
}