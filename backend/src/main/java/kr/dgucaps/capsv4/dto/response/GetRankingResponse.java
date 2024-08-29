package kr.dgucaps.capsv4.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetRankingResponse {

    private Integer rank;

    private Integer userId;

    private Integer grade;

    private String name;

    private String comment;

    private Integer postCount;

    private Integer commentCount;

    private Integer point;
}
