package kr.dgucaps.capsv4.domain.notification.repository;

import kr.dgucaps.capsv4.domain.notification.entity.Notification;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import kr.dgucaps.capsv4.domain.user.entity.User;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    long countNotiByUser(User user, Boolean isRead);
    
    @Query("SELECT n FROM Notification n WHERE n.user = :user ORDER BY n.datetime DESC")
    List<Notification> getNotiByUser(User user);
    
}