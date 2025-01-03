package kr.dgucaps.capsv4.domain.event.repository;

import kr.dgucaps.capsv4.domain.event.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

    @Override
    @EntityGraph(attributePaths = {"user"})
    Page<Event> findAll(Pageable pageable);

    @EntityGraph(attributePaths = {"user"})
    Page<Event> findByTitleContaining(String title, Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"user"})
    Optional<Event> findById(Integer id);
}
