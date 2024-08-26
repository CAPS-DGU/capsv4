package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudyRepository extends JpaRepository<Study, Integer> {

    @EntityGraph(attributePaths = {"maker"})
    @Query("SELECT s FROM Study s WHERE s.category LIKE %:search% OR s.title LIKE %:search%")
    Page<Study> findByCategoryOrTitleContaining(@Param("search") String search, Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"maker"})
    Optional<Study> findById(Integer id);
}
