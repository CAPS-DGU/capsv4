package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.Board;
import kr.dgucaps.capsv4.entity.BoardLike;
import kr.dgucaps.capsv4.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLike, Integer> {

    boolean existsByBoardAndUser(Board board, User user);
}
