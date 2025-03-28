package kr.dgucaps.capsv4.domain.file.repository;

import kr.dgucaps.capsv4.domain.file.entity.StudyFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudyFileRepository extends JpaRepository<StudyFile, Integer> {

    Optional<StudyFile> findByName(String fileName);
}
