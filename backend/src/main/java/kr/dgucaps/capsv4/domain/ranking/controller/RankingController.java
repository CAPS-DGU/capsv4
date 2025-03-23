package kr.dgucaps.capsv4.domain.ranking.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.dgucaps.capsv4.global.DataResponse;
import kr.dgucaps.capsv4.domain.ranking.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
@Tag(name = "Ranking", description = "활동랭킹 API")
public class RankingController {

    private final RankingService rankingService;

    @GetMapping("/ranking/total")
    @Operation(summary = "전체 랭킹 조회")
    public ResponseEntity<DataResponse> getTotalRanking() {
        return ResponseEntity.ok(DataResponse.builder().message("전체 랭킹 조회 성공").data(rankingService.getTotalRanking()).build());
    }

    @GetMapping("/ranking/monthly")
    @Operation(summary = "월별 랭킹 조회")
    public ResponseEntity<DataResponse> getMonthRanking() {
        return ResponseEntity.ok(DataResponse.builder().message("월별 랭킹 조회 성공").data(rankingService.getMonthlyRanking()).build());
    }

    @GetMapping("/ranking/old")
    @Operation(summary = "(구) 랭킹 조회")
    public ResponseEntity<DataResponse> getOldRanking() {
        return ResponseEntity.ok(DataResponse.builder().message("(구) 랭킹 조회 성공").data(rankingService.getOldRanking()).build());
    }
}
