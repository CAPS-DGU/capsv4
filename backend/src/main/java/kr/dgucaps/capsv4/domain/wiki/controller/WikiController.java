package kr.dgucaps.capsv4.domain.wiki.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import kr.dgucaps.capsv4.domain.wiki.dto.CreateOrModifyWikiRequest;
import kr.dgucaps.capsv4.domain.wiki.dto.GetWikiResponse;
import kr.dgucaps.capsv4.global.DataResponse;
import kr.dgucaps.capsv4.domain.wiki.service.WikiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "Wiki", description = "위키 API")
public class WikiController {

    private final WikiService wikiService;

    @PostMapping("/wiki")
    @Operation(summary = "위키 작성 & 수정")
    @PreAuthorize("hasAnyRole('MEMBER', 'GRADUATE', 'COUNCIL', 'PRESIDENT', 'ADMIN')")
    public ResponseEntity<DataResponse> createWiki(@RequestBody @Valid CreateOrModifyWikiRequest request) {
        wikiService.createOrModifyWiki(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(DataResponse.builder().message("위키 작성/수정 성공").build());
    }

    @GetMapping("/wiki")
    @Operation(summary = "위키 조회")
    public ResponseEntity<DataResponse> getWiki(@RequestParam(value = "title") String title) {
        GetWikiResponse response = wikiService.getWiki(title);
        if (response.getExist()) {
            return ResponseEntity.ok(DataResponse.builder().message("위키 조회 성공").data(response).build());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(DataResponse.builder().message("위키를 찾을 수 없음").data(response).build());
        }
    }

    @GetMapping("/wiki/history")
    @Operation(summary = "수정 내역 조회")
    public ResponseEntity<DataResponse> getWikiHistory(@RequestParam(value = "title") String title) {
        return ResponseEntity.ok(DataResponse.builder().message("수정 내역 조회 성공").data(wikiService.getWikiHistory(title)).build());
    }

    @PutMapping("/wiki")
    @Operation(summary = "위키 수정")
    public ResponseEntity<DataResponse> modifyWiki(@RequestBody @Valid CreateOrModifyWikiRequest request) {
        wikiService.createOrModifyWiki(request);
        return ResponseEntity.ok(DataResponse.builder().message("위키 수정 성공").build());
    }

    @GetMapping("/wiki/random")
    @Operation(summary = "랜덤 위키", description = "무작위 title을 응답합니다")
    public ResponseEntity<DataResponse> getRandomWiki() {
        return ResponseEntity.ok(DataResponse.builder().message("랜덤 위키 조회 성공").data(wikiService.getRandomWiki()).build());
    }

    @GetMapping("/wiki/recent")
    @Operation(summary = "최근 수정 위키")
    public ResponseEntity<DataResponse> getRecentWiki() {
        List<GetRecentWikiResponse> recentWiki = wikiService.getRecentWiki();
        return ResponseEntity.ok(DataResponse.builder().message("최근 수정 위키 조회 성공").data(recentWiki).build());
    }
}
