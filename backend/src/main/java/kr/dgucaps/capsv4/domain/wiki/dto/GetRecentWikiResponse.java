package kr.dgucaps.capsv4.domain.wiki.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetRecentWikiResponse {
    private String title;

    public static GetRecentWikiResponse title(String title) {
        return GetRecentWikiResponse.builder()
                .title(title)
                .build();
    }
}