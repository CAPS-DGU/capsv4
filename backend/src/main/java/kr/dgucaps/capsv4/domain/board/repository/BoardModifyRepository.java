package kr.dgucaps.capsv4.domain.board.repository;

import kr.dgucaps.capsv4.domain.board.entity.BoardModify;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardModifyRepository extends JpaRepository<BoardModify, Integer> {
}
