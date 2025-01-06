package kr.dgucaps.capsv4.domain.wiki.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateOrModifyWikiRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String content;
}
