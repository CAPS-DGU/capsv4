package kr.dgucaps.capsv4.dto.request;

import lombok.Data;

@Data
public class GetStudyListParameter {

    private int page = 0;

    private String search;
}
