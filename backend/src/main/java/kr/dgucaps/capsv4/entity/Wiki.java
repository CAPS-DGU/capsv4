package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "wiki_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Wiki {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wiki_writer_id")
    private User writer;

    private Boolean isDeleted;

    @Column(name = "wiki_title")
    private String title;

    @Column(name = "wiki_content")
    private String content;

    @Column(name = "wiki_time")
    private LocalDateTime dateTime;

    @Builder
    public Wiki(User writer, String title, String content) {
        this.writer = writer;
        this.isDeleted = false;
        this.title = title;
        this.content = content;
        this.dateTime = LocalDateTime.now();
    }
}
