package kr.dgucaps.capsv4.domain.notification.entity;

import jakarta.persistence.*;
import kr.dgucaps.capsv4.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "notification_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private Boolean isRead;

    @Column(name = "noti_type")
    private String type;

    @Column(name = "noti_time")
    private LocalDateTime datetime;

    @Column(name = "noti_link")
    private String link;

    @Builder
    public Notification(User user, String type, String link) {
        this.user = user;
        this.isRead = false;
        this.type = type;
        this.datetime = LocalDateTime.now();
        this.link = link;
    }
}
