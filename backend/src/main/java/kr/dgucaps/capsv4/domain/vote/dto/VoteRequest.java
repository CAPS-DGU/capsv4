package kr.dgucaps.capsv4.domain.vote.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VoteRequest {

    @NotNull
    private Integer voteId;

    @NotNull
    private Integer choiceId;

    @NotNull
    private String clientIp;
}
