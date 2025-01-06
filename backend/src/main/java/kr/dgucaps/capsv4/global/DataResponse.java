package kr.dgucaps.capsv4.global;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class DataResponse {

    private final Boolean success = true;

    private String message;

    private Object data;
}
