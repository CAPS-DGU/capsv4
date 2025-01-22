package kr.dgucaps.capsv4.domain.notification.service;

import kr.dgucaps.capsv4.domain.notification.entity.Notification;
import kr.dgucaps.capsv4.domain.user.entity.User;
import kr.dgucaps.capsv4.domain.user.repository.UserRepository;
import kr.dgucaps.capsv4.domain.notification.repository.NotificationRepository;
import kr.dgucaps.capsv4.domain.notification.dto.GetNotificationStatusResponse;
import kr.dgucaps.capsv4.domain.notification.dto.GetNotificationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NotificationService {

    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Transactional
    public void createNotification(User user, String type, String link) {
        Notification notification = Notification.builder()
                .user(user)
                .type(type)
                .link(link)
                .build();
        notificationRepository.save(notification);
    }

    public GetNotificationStatusResponse getNotificationStatus(String userId) {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
        int notiCount = notificationRepository.countNotiByUser(user, false);
        Boolean hasNoti = notiCount > 0;

        return GetNotificationStatusResponse.builder()
            .hasNotification(hasNoti)
            .notificationCount(notiCount);
            .build();
    }

    public List<GetNotificationResponse> getNotification(String userId) {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
        List<Notification> notifications = notificationRepository.getNotiByUser(user);

        return notifications.stream()
            .map(notification -> GetNotificationResponse.builder()
            .id(notification.getId())
            .isRead(notification.getIsRead())
            .type(notification.getType())
            .datetime(notification.getDatetime())
            .link(notification.getLink())
            .build())
        .collect(Collectors.toList());
    }
}