package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
import kr.dgucaps.capsv4.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "study_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE study_tb SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
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

    @Builder
    public Study(User user, String title, String category, String description, StudyDay day, String location, StudyType type, Integer maxParticipants) {
        this.maker = user;
        this.title = title;
        this.category = category;
        this.description = description;
        this.year = Year.now().getValue();
        this.semester = StudySemester.fromMonth(LocalDate.now().getMonth());
        this.day = day;
        this.location = location;
        this.type = type;
        this.maxParticipants = maxParticipants;
        this.isDeleted = false;
    }

    public void updateTitle(String title) {
        this.title = title;
    }

    public void updateCategory(String category) {
        this.category = category;
    }

    public void updateDescription(String description) {
        this.description = description;
    }

    public void updateDay(StudyDay day) {
        this.day = day;
    }

    public void updateLocation(String location) {
        this.location = location;
    }

    public void updateType(StudyType type) {
        this.type = type;
    }

    public void updateMaxParticipants(Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
    }
}
