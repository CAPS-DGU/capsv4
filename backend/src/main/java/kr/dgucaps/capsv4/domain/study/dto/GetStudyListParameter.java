package kr.dgucaps.capsv4.domain.study.dto;

import lombok.Data;

@Data
public class GetStudyListParameter {

    private int page = 0;

    private String search;
}
