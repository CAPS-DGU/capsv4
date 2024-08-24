package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "comment_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE comment_tb SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private Boolean isDeleted;

    @Column(name = "comment_target")
    private Integer target;

    @Column(name = "comment_content")
    private String content;

    @Column(name = "comment_time")
    private LocalDateTime dateTime;

    @Builder
    public Comment(Board board, User user, Integer target, String content) {
        this.board = board;
        this.user = user;
        this.isDeleted = false;
        this.target = target;
        this.content = content;
        this.dateTime = LocalDateTime.now();
    }
}
