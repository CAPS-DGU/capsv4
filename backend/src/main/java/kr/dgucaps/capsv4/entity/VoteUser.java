package kr.dgucaps.capsv4.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import kr.dgucaps.capsv4.entity.ids.VoteUserId;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "vote_user_tb")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VoteUser {

    @EmbeddedId
    private VoteUserId id;

    private LocalDateTime voteTime;
}
