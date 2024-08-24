package kr.dgucaps.capsv4.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import kr.dgucaps.capsv4.dto.request.CreateCommentRequest;
import kr.dgucaps.capsv4.dto.response.common.DataResponse;
import kr.dgucaps.capsv4.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "Comment", description = "댓글 API")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/comment")
    @Operation(summary = "댓글 작성")
    public ResponseEntity<DataResponse> createComment(CreateCommentRequest request) {
        commentService.createComment(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(DataResponse.builder().message("댓글 작성 성공").build());
    }

    @DeleteMapping("/comment/{commentId}")
    @Operation(summary = "댓글 삭제")
    public ResponseEntity<DataResponse> deleteComment(@PathVariable Integer commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok(DataResponse.builder().message("댓글 삭제 성공").build());
    }
}
