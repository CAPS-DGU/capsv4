package kr.dgucaps.capsv4.domain.vote.repository;

import kr.dgucaps.capsv4.domain.vote.entity.Vote;
import kr.dgucaps.capsv4.domain.vote.entity.VoteStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Integer> {

    Optional<Vote> findByStatus(VoteStatus status);
}
