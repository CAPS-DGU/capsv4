package kr.dgucaps.capsv4.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import kr.dgucaps.capsv4.dto.request.VoteRequest;
import kr.dgucaps.capsv4.dto.response.common.DataResponse;
import kr.dgucaps.capsv4.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "Vote", description = "투표 API")
public class VoteController {

    private final VoteService voteService;

    @GetMapping("/vote")
    @Operation(summary = "투표 조회", description = "활성화된 투표 조회")
    public ResponseEntity<DataResponse> getVote() {
        return ResponseEntity.ok(DataResponse.builder().message("투표 조회 성공").data(voteService.getVote()).build());
    }

    @PostMapping("/vote")
    @Operation(summary = "투표 실시", description = "졸업생 권한(GRADUATE) 사용자는 참여 불가")
    @PreAuthorize("hasAnyRole('MEMBER', 'COUNCIL', 'PRESIDENT', 'ADMIN')")
    public ResponseEntity<DataResponse> vote(@RequestBody @Valid VoteRequest request) {
        voteService.vote(request);
        return ResponseEntity.ok(DataResponse.builder().message("투표 성공").build());
    }

//    @GetMapping("/vote/result/{voteId}")
//    @Operation(summary = "투표 결과 조회")
//    @PreAuthorize("hasAnyRole('PRESIDENT', 'ADMIN')")
//    public ResponseEntity<DataResponse> getVoteResult(@PathVariable Integer voteId) {
//
//    }
}
