package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "board_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @BatchSize(size = 10)
    @OneToMany(mappedBy = "board")
    private List<Comment> comments = new ArrayList<>();
}
