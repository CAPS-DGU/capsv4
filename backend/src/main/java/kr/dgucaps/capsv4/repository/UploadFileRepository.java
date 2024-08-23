package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.UploadFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UploadFileRepository extends JpaRepository<UploadFile, Integer> {
}
