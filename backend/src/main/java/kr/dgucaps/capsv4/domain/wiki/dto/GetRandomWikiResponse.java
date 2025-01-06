package kr.dgucaps.capsv4.domain.wiki.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetRandomWikiResponse {

    private String title;
}
