package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

    @EntityGraph(attributePaths = {"user"})
    Page<Board> findByCategory(Integer category, Pageable pageable);

    @EntityGraph(attributePaths = {"user"})
    Page<Board> findByCategoryAndTitleContaining(Integer category, String search, Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"user", "comments.user"})
    Optional<Board> findById( Integer integer);
}
