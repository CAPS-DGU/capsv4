package kr.dgucaps.capsv4.dto.request;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class TokenRenewalRequest {

    private String refreshToken;
}
