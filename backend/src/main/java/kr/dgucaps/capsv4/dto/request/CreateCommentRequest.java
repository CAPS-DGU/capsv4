package kr.dgucaps.capsv4.dto.request;

import kr.dgucaps.capsv4.entity.Board;
import kr.dgucaps.capsv4.entity.Comment;
import kr.dgucaps.capsv4.entity.User;
import lombok.Data;

@Data
public class CreateCommentRequest {

    private Integer boardId;

    private Integer targetId;

    private String content;

    public Comment toEntity(Board board, User user) {
        return Comment.builder()
                .board(board)
                .user(user)
                .target(targetId)
                .content(content)
                .build();
    }
}
