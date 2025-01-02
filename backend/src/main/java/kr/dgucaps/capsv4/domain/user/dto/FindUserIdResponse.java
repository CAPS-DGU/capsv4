package kr.dgucaps.capsv4.domain.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindUserIdResponse {

    private String userId;
}
