package kr.dgucaps.capsv4.domain.event.dto;

import lombok.Data;

@Data
public class GetEventListParameter {

    private int page = 0;

    private String keyword;
}
