package kr.dgucaps.capsv4.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateWikiRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String content;
}
