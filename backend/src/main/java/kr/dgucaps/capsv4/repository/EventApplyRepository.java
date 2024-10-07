package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.Event;
import kr.dgucaps.capsv4.entity.EventApply;
import kr.dgucaps.capsv4.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventApplyRepository extends JpaRepository<EventApply, Integer> {

    List<EventApply> findByEvent(Event event);

    boolean existsByEvent(Event event);

    boolean existsByEventAndUser(Event event, User user);

    int countByEvent(Event event);
}
