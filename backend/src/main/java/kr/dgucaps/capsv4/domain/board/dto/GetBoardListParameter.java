package kr.dgucaps.capsv4.domain.board.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GetBoardListParameter {

    @NotNull
    private Integer category;

    private int page = 0;

    private String search;
}
