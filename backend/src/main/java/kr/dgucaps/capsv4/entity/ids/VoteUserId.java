package kr.dgucaps.capsv4.entity.ids;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VoteUserId {

    @Column(name = "vote_id")
    private Integer voteId;

    @Column(name = "user_id")
    private Integer userId;
}
