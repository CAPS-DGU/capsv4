package kr.dgucaps.capsv4.domain.vote.repository;

import kr.dgucaps.capsv4.domain.user.entity.User;
import kr.dgucaps.capsv4.domain.vote.entity.Vote;
import kr.dgucaps.capsv4.domain.vote.entity.VoteUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteUserRepository extends JpaRepository<VoteUser, Integer> {

    boolean existsByVoteAndUser(Vote vote, User user);
}
