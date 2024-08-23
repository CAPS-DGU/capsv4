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
@Table(name = "upload_file_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE upload_file_tb SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class UploadFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    private Boolean isDeleted;

    @Column(name = "file_name")
    private String name;

    @Column(name = "file_title")
    private String title;

    @Column(name = "upload_time")
    private LocalDateTime dateTime;

    @Builder
    public UploadFile(Board board, String name, String title) {
        this.board = board;
        this.isDeleted = false;
        this.name = name;
        this.title = title;
        this.dateTime = LocalDateTime.now();
    }
}
