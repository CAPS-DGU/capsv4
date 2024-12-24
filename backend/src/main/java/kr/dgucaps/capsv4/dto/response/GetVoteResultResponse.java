package kr.dgucaps.capsv4.dto.response;

import kr.dgucaps.capsv4.entity.VoteStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class GetVoteResultResponse {

    private Integer id;

    private String title;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private Integer totalVotes;

    private List<Result> result;

    private VoteStatus status;

    @Data
    @Builder
    public static class Result {
        private Integer id;

        private String content;

        private Integer numberOfVotes;
    }
}
