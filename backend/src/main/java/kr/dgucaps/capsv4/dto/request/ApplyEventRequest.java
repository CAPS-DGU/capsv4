package kr.dgucaps.capsv4.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApplyEventRequest {

    @NotNull
    private Integer eventId;

    @NotNull
    private LocalDateTime date;

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
