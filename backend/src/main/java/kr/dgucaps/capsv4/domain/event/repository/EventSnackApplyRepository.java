package kr.dgucaps.capsv4.domain.event.repository;

import kr.dgucaps.capsv4.domain.event.entity.EventSnackApply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventSnackApplyRepository extends JpaRepository<EventSnackApply, Integer> {
}
