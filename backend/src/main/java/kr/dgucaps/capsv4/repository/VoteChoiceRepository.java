package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.Vote;
import kr.dgucaps.capsv4.entity.VoteChoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteChoiceRepository extends JpaRepository<VoteChoice, Integer> {

    List<VoteChoice> findByVote(Vote vote);
}
