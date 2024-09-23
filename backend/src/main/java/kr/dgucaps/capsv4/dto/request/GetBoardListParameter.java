package kr.dgucaps.capsv4.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GetBoardListParameter {

    @NotNull
    private Integer category;

    private int page = 0;

    private String search;
}
