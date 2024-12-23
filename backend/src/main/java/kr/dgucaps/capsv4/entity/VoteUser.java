package kr.dgucaps.capsv4.entity;

import jakarta.persistence.*;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("voteId")
    @JoinColumn(name = "vote_id")
    private Vote vote;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime voteTime;
}
