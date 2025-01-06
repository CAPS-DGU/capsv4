package kr.dgucaps.capsv4.domain.vote.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "vote_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @Enumerated(EnumType.STRING)
    private VoteStatus status;

    @OneToMany(mappedBy = "vote")
    private List<VoteUser> voteUsers = new ArrayList<>();

    @OneToMany(mappedBy = "vote")
    private List<VoteChoice> voteChoices = new ArrayList<>();

    @OneToMany(mappedBy = "vote")
    private List<VoteResult> voteResults = new ArrayList<>();
}
