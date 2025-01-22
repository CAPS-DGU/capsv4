package kr.dgucaps.capsv4.domain.notification.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetNotificationStatusResponse {

    private Boolean hasNotification;

    private Integer notificationCount;
    
}