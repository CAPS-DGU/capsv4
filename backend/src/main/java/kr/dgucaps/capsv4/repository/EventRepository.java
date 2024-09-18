package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

//    Page<Event> findAll(Pageable pageable);

    Page<Event> findByTitleContaining(String title, Pageable pageable);
}
