package kr.dgucaps.capsv4.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.dgucaps.capsv4.dto.request.CreateBoardRequest;
import kr.dgucaps.capsv4.dto.request.GetBoardListParameter;
import kr.dgucaps.capsv4.dto.response.common.DataResponse;
import kr.dgucaps.capsv4.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Tag(name = "Board", description = "게시글 API")
public class BoardController {

    private final BoardService boardService;

    @PostMapping(value = "/board", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "게시글 작성", description = "파일 미포함시 '-' 표시 눌러 업로드칸 제거 후 Send empty value 체크 해제 해야합니다!")
    @PreAuthorize("hasAnyRole('MEMBER', 'GRADUATE', 'COUNCIL', 'PRESIDENT', 'ADMIN')")
    public ResponseEntity<DataResponse> createBoard(@ModelAttribute CreateBoardRequest request) throws IOException {
        boardService.createBoard(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(DataResponse.builder().message("게시글 작성 성공").build());
    }

    @PostMapping("/board/{boardId}/like")
    @Operation(summary = "게시글 좋아요")
    @PreAuthorize("hasAnyRole('MEMBER', 'GRADUATE', 'COUNCIL', 'PRESIDENT', 'ADMIN')")
    public ResponseEntity<DataResponse> likeBoard(@PathVariable("boardId") Integer boardId) {
        boardService.likeBoard(boardId);
        return ResponseEntity.ok(DataResponse.builder().message("게시글 좋아요 성공").build());
    }

    @GetMapping("/board/{category}")
    @Operation(summary = "카테고리별 게시글 목록 조회")
    public ResponseEntity<DataResponse> getBoardList(@PathVariable("category") Integer category,
                                                     @ParameterObject GetBoardListParameter parameter) {
        return ResponseEntity.ok(DataResponse.builder().message("게시글 목록 조회 성공").data(boardService.getBoardListByCategory(category, parameter)).build());
    }
}
