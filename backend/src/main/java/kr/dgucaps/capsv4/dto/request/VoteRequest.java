package kr.dgucaps.capsv4.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VoteRequest {

    @NotNull
    private Integer voteId;

    @NotNull
    private Integer choiceId;
}
