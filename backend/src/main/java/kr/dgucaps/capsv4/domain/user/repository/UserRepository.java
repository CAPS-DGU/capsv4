package kr.dgucaps.capsv4.domain.user.repository;

import kr.dgucaps.capsv4.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByUserId(String userId);

    Optional<User> findByUserId(String userId);

    Optional<User> findByNameAndEmail(String name, String email);

    void deleteByUserId(String userId);

    @Query("SELECT u FROM User u ORDER BY u.totalPoint DESC")
    List<User> findAllUsersOrderByTotalPointDesc();

    @Query("SELECT u FROM User u ORDER BY u.point DESC")
    List<User> findAllUsersOrderByPointDesc();
}
