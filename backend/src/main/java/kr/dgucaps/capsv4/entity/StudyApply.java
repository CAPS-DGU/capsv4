package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "study_apply_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudyApply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "apply_time")
    private LocalDateTime dateTime;

    @Enumerated(EnumType.STRING)
    private StudyApplyStatus status;

    @Builder
    public StudyApply(Study study, User user) {
        this.study = study;
        this.user = user;
        this.dateTime = LocalDateTime.now();
        this.status = StudyApplyStatus.PENDING;
    }

    public void changeStatus(StudyApplyStatus status) {
        this.status = status;
    }
}
