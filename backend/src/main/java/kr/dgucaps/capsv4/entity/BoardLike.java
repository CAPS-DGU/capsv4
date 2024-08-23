package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "board_like_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime likeTime;

    @Builder
    public BoardLike(Board board, User user) {
        this.board = board;
        this.user = user;
        this.likeTime = LocalDateTime.now();
    }
}
