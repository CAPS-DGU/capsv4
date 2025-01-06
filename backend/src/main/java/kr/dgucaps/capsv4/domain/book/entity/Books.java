package kr.dgucaps.capsv4.domain.book.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "book_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Books {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Boolean isCheckout;

    @Column(name = "book_title")
    private String title;

    @Column(name = "book_author")
    private String author;

    @Column(name = "book_publisher")
    private String publisher;

    @Column(name = "book_category")
    private String category;

    @Column(name = "book_code")
    private String code;

    @OneToOne(mappedBy = "book", fetch = FetchType.LAZY)
    private BookFile bookFile;

    @OneToMany(mappedBy = "book")
    private List<Checkout> checkouts = new ArrayList<>();
}
