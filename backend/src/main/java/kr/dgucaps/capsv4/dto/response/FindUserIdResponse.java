package kr.dgucaps.capsv4.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindUserIdResponse {

    private String userId;
}
