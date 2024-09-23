package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.Event;
import kr.dgucaps.capsv4.entity.EventApply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventApplyRepository extends JpaRepository<EventApply, Integer> {

    List<EventApply> findByEvent(Event event);
}
