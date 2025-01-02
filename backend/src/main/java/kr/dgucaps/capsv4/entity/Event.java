package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
import kr.dgucaps.capsv4.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "event_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
@SuperBuilder
@SQLDelete(sql = "UPDATE event_tb SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "event_title")
    private String title;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private Integer maxParticipants;

    @Column(name = "event_description")
    private String description;

    @OneToMany(mappedBy = "event")
    @Builder.Default
    private List<EventSnackApply> snackApplies = new ArrayList<>();

    @OneToMany(mappedBy = "event")
    @Builder.Default
    private List<EventQuizApply> quizApplies = new ArrayList<>();

    public void updateTitle(String title) {
        this.title = title;
    }

    public void updateStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public void updateEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public void updateMaxParticipants(int maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public void updateDescription(String description) {
        this.description = description;
    }
}
