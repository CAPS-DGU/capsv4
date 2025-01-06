package kr.dgucaps.capsv4.domain.user.repository;

import kr.dgucaps.capsv4.domain.user.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PointRepository extends JpaRepository<Point, Integer> {

    @Query("SELECT p.user, COALESCE(SUM(p.point), 0) AS totalPoints FROM Point p WHERE p.dateTime >= :startDate GROUP BY p.user")
    List<Object[]> findRankingByPoints(@Param("startDate")LocalDateTime startDate);
}
