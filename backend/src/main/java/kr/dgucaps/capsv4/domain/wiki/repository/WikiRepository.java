package kr.dgucaps.capsv4.domain.wiki.repository;

import kr.dgucaps.capsv4.domain.wiki.entity.Wiki;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WikiRepository extends JpaRepository<Wiki, Integer> {

    Optional<Wiki> findByTitleAndIsDeletedFalse(String title);

    List<Wiki> findByTitleOrderByDateTimeDesc(@Param("title") String title);

    void deleteByTitleAndIsDeletedFalse(String title);

    @Query("SELECT w.title FROM Wiki w WHERE w.isDeleted = false ORDER BY RAND() LIMIT 1")
    String findRandomTitle();

    boolean existsByTitleAndIsDeletedFalse(String title);

    List<Wiki> findFirst10ByIsDeletedFalseOrderByDateTimeDesc();
}