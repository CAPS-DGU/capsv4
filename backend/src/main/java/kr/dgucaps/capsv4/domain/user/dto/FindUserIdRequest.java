package kr.dgucaps.capsv4.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FindUserIdRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String email;
}
