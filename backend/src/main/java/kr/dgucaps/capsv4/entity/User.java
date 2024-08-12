package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "user_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_permission")
    private UserPermission permission;

    private String userId;

    @Column(name = "user_password")
    private String password;

    @Column(name = "user_name")
    private String name;

    @Column(name = "user_grade")
    private Integer grade;

    @Column(name = "user_email")
    private String email;

    @Column(name = "user_comment")
    private String comment;

    @Column(name = "user_image_name")
    private String imageName;

    @Column(name = "user_point")
    private Integer point;

    private Integer totalPoint;

    @Column(name = "user_last_login_date")
    private LocalDate lastLoginDate;

    @OneToMany(mappedBy = "user")
    private List<Notification> notifications = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Point> points = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Board> boards = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<BoardLike> boardLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "maker")
    private List<Study> studies = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<StudyApply> studyApplies = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<StudyTutee> studyTutees = new ArrayList<>();

    @OneToMany(mappedBy = "writer")
    private List<Wiki> wikis = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Checkout> checkouts = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Event> events = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<EventSnackApply> snackApplies = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<EventQuizApply> quizApplies = new ArrayList<>();
}
