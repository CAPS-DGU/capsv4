package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "vote_choice_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VoteChoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_id")
    private Vote vote;

    private String content;

    @OneToMany(mappedBy = "choice")
    private List<VoteResult> results = new ArrayList<>();
}
