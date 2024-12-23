package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.Vote;
import kr.dgucaps.capsv4.entity.VoteStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Integer> {

    Optional<Vote> findByStatus(VoteStatus status);
}
