package kr.dgucaps.capsv4.dto.response.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ErrorResponse {

    private final Boolean success = false;

    private String message;

    private String details;
}
