package kr.dgucaps.capsv4.domain.study.repository;

import kr.dgucaps.capsv4.domain.study.entity.StudyConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudyConfigRepository extends JpaRepository<StudyConfig, Integer> {

    Optional<StudyConfig> findByConfigKey(String configKey);
}
