package kr.dgucaps.capsv4.domain.vote.repository;

import kr.dgucaps.capsv4.domain.vote.entity.Vote;
import kr.dgucaps.capsv4.domain.vote.entity.VoteChoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteChoiceRepository extends JpaRepository<VoteChoice, Integer> {

    List<VoteChoice> findByVote(Vote vote);
}
