package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.Study;
import kr.dgucaps.capsv4.entity.StudyApply;
import kr.dgucaps.capsv4.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudyApplyRepository extends JpaRepository<StudyApply, Integer> {

    boolean existsByStudyAndUser(Study study, User user);

    int countByStudy(Study study);

    Optional<StudyApply> findByStudyIdAndUserId(Integer studyId, Integer userId);
}
