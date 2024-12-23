package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.VoteChoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteChoiceRepository extends JpaRepository<VoteChoice, Integer> {
}
