package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.StudyTutee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyTuteeRepository extends JpaRepository<StudyTutee, Integer> {
}
