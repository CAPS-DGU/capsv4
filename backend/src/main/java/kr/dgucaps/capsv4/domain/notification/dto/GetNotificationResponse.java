package kr.dgucaps.capsv4.domain.notification.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class GetNotificationResponse {

    private Integer id;

    private Boolean isRead;

    private String type;

    private LocalDateTime datetime;

    private String link;
    
}