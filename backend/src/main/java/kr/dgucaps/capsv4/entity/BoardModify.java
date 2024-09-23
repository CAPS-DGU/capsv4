package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "board_modify_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardModify {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @Column(name = "board_title")
    private String title;

    @Column(name = "board_category")
    private Integer category;

    @Column(name = "board_time")
    private LocalDateTime datetime;

    @Column(name = "board_content")
    private String content;

    @Builder
    public BoardModify(Board board, String title, Integer category, String content) {
        this.board = board;
        this.title = title;
        this.category = category;
        this.datetime = LocalDateTime.now();
        this.content = content;
    }
}
