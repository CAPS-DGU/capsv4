package kr.dgucaps.capsv4.domain.vote.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "vote_result_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VoteResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_id")
    private Vote vote;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "choice_id")
    private VoteChoice voteChoice;

    @Builder
    public VoteResult(Vote vote, VoteChoice voteChoice) {
        this.vote = vote;
        this.voteChoice = voteChoice;
    }
}
