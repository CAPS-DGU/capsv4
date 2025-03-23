package kr.dgucaps.capsv4.domain.event.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ApplyEventRequest {

    @NotNull
    private Integer eventId;

    private Snack snack;

    @Data
    public static class Snack {

        @NotBlank
        @Pattern(regexp = "^(?:(\\+82|0)-?(?:2|10)-?)?(\\d{3,4})-?(\\d{4})$", message = "유효한 전화번호를 입력해야 합니다")
        private String phone;
    }

    private Quiz quiz;

    @Data
    public static class Quiz {

        @NotBlank
        private String answer;
    }
}
