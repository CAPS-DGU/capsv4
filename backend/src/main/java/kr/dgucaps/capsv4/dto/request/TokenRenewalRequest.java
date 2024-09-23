package kr.dgucaps.capsv4.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TokenRenewalRequest {

    @NotBlank
    private String refreshToken;
}
