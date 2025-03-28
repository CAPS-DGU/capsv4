package kr.dgucaps.capsv4.domain.study.repository;

import kr.dgucaps.capsv4.domain.study.entity.Study;
import kr.dgucaps.capsv4.domain.study.entity.StudyApply;
import kr.dgucaps.capsv4.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudyApplyRepository extends JpaRepository<StudyApply, Integer> {

    boolean existsByStudyAndUser(Study study, User user);

    int countByStudy(Study study);

    Optional<StudyApply> findByStudyIdAndUserId(Integer studyId, Integer userId);

    List<StudyApply> findByStudy(Study study);

    void deleteByStudyIdAndUserId(Integer studyId, Integer userId);
}
