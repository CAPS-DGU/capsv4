package kr.dgucaps.capsv4.domain.board.repository;

import kr.dgucaps.capsv4.domain.board.entity.Board;
import kr.dgucaps.capsv4.domain.board.entity.BoardLike;
import kr.dgucaps.capsv4.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLike, Integer> {

    boolean existsByBoardAndUser(Board board, User user);
}
