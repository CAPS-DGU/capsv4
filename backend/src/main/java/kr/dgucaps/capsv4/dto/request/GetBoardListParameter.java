package kr.dgucaps.capsv4.dto.request;

import lombok.Data;

@Data
public class GetBoardListParameter {

    private int page = 0;

    private String search;
}
