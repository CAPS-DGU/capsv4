package kr.dgucaps.capsv4.domain.event.repository;

import kr.dgucaps.capsv4.domain.event.entity.EventQuiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventQuizRepository extends JpaRepository<EventQuiz, Integer> {
}
