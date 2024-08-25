package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "study_file_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudyFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    private Boolean isDeleted;

    @Column(name = "file_name")
    private String name;

    @Column(name = "file_title")
    private String title;

    @Column(name = "upload_time")
    private LocalDateTime dateTime;

    @Builder
    public StudyFile(Study study, String name, String title) {
        this.study = study;
        this.isDeleted = false;
        this.name = name;
        this.title = title;
        this.dateTime = LocalDateTime.now();
    }
}
