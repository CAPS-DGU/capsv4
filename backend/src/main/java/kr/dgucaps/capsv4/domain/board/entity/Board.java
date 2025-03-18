package kr.dgucaps.capsv4.domain.board.entity;

import jakarta.persistence.*;
import kr.dgucaps.capsv4.domain.comment.entity.Comment;
import kr.dgucaps.capsv4.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "board_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE board_tb SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_writer_id")
    private User user;

    private Boolean isDeleted;

    private Boolean isModified;

    @Column(name = "board_category")
    private Integer category;

    @Column(name = "board_title")
    private String title;

    @Column(name = "board_time")
    private LocalDateTime datetime;

    @Column(name = "board_hit")
    private Integer hit;

    @Column(name = "board_content")
    private String content;

    @Builder
    public Board(User user, Integer category, String title, String content) {
        this.user = user;
        this.isDeleted = false;
        this.isModified = false;
        this.category = category;
        this.title = title;
        this.datetime = LocalDateTime.now();
        this.hit = 0;
        this.content = content;
    }

    @OneToMany(mappedBy = "board")
    private List<BoardModify> boardModifies = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<BoardLike> boardLikes = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<UploadFile> uploadFiles = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<Comment> comments = new ArrayList<>();

    public void updateHit() {
        this.hit++;
    }

    public void updateCategory(Integer category) {
        this.category = category;
    }

    public void updateTitle(String title) {
        this.title = title;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void markModified() {
        this.isModified = true;
    }
}
