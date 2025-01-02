package kr.dgucaps.capsv4.domain.user.entity;

import jakarta.persistence.*;
import kr.dgucaps.capsv4.domain.board.entity.Board;
import kr.dgucaps.capsv4.domain.board.entity.BoardLike;
import kr.dgucaps.capsv4.entity.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Getter
@Table(name = "user_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE user_tb SET user_id = CONCAT('[deleted]', user_id), is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_permission")
    private UserPermission permission;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + permission.toString()));
    }

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

    private Boolean isDeleted;

    @Builder
    public User(String userId, String password, String name, Integer grade, String email) {
        this.permission = UserPermission.NEW_MEMBER;
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.grade = grade;
        this.email = email;
        this.point = 0;
        this.totalPoint = 0;
        this.isDeleted = false;
    }

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

    @OneToMany(mappedBy = "user")
    private List<VoteUser> voteUsers = new ArrayList<>();

    public void updatePassword(String password) {
        this.password = password;
    }

    public void updateComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
