package kr.dgucaps.capsv4.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TokenRenewalRequest {

    @NotBlank
    private String refreshToken;
}
