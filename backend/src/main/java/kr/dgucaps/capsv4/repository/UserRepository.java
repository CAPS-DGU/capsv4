package kr.dgucaps.capsv4.repository;

import kr.dgucaps.capsv4.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByUserId(String userId);

    Optional<User> findByUserId(String userId);

    Optional<User> findByNameAndEmail(String name, String email);
}
