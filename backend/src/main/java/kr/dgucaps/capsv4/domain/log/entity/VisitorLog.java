package kr.dgucaps.capsv4.domain.log.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "visitor_log_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VisitorLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;

    private String ip;

    private String port;

    private String referrer;

    private String currentLink;

    private String browser;

    @Column(name = "connect_time")
    private LocalDateTime dateTime;
}
