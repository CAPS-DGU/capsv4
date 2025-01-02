package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
import kr.dgucaps.capsv4.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "point_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "earn_point")
    private Integer point;

    @Column(name = "earn_date")
    private LocalDateTime dateTime;
}
