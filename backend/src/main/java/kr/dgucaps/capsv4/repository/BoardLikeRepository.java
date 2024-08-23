package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.BoardLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLike, Integer> {
}
