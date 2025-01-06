package kr.dgucaps.capsv4.domain.vote.repository;

import kr.dgucaps.capsv4.domain.vote.entity.Vote;
import kr.dgucaps.capsv4.domain.vote.entity.VoteChoice;
import kr.dgucaps.capsv4.domain.vote.entity.VoteResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteResultRepository extends JpaRepository<VoteResult, Integer> {

    int countByVote(Vote vote);

    int countByVoteAndVoteChoice(Vote vote, VoteChoice voteChoice);
}
