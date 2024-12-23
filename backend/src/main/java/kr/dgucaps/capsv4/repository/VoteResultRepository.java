package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.VoteResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteResultRepository extends JpaRepository<VoteResult, Integer> {
}
