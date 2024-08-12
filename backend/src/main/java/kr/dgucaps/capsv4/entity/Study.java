package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "study_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Study {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_maker_id")
    private User maker;

    @Column(name = "study_title")
    private String title;

    @Column(name = "study_category")
    private String category;

    @Column(name = "study_description")
    private String description;

    @Column(name = "study_year")
    private Integer year;

    @Enumerated(EnumType.STRING)
    @Column(name = "study_semester")
    private StudySemester semester;

    @Enumerated(EnumType.STRING)
    @Column(name = "study_day")
    private StudyDay day;

    @Column(name = "study_location")
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(name = "study_type")
    private StudyType type;

    private Integer maxParticipants;

    private Boolean isDeleted;

    @OneToMany(mappedBy = "study")
    private List<StudyFile> studyFiles = new ArrayList<>();

    @OneToMany(mappedBy = "study")
    private List<StudyApply> studyApplies = new ArrayList<>();

    @OneToMany(mappedBy = "study")
    private List<StudyTutee> studyTutees = new ArrayList<>();
}
