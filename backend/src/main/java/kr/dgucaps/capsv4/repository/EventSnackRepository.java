package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.EventSnack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventSnackRepository extends JpaRepository<EventSnack, Integer> {
}
