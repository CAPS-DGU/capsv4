package kr.dgucaps.capsv4.dto.response;

import kr.dgucaps.capsv4.entity.VoteStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class GetVoteResponse {

    private int id;

    private String title;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private VoteStatus status;

    private List<Choice> choices;

    @Data
    @Builder
    public static class Choice {
        private int id;

        private String content;
    }
}
