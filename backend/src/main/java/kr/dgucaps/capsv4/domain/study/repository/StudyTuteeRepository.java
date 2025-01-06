package kr.dgucaps.capsv4.domain.study.repository;

import kr.dgucaps.capsv4.domain.study.entity.StudyTutee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyTuteeRepository extends JpaRepository<StudyTutee, Integer> {

    void deleteByStudyIdAndUserId(Integer studyId, Integer userId);
}
