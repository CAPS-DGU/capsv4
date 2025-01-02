package kr.dgucaps.capsv4.domain.comment.service;

import kr.dgucaps.capsv4.domain.board.exception.BoardNotFoundException;
import kr.dgucaps.capsv4.domain.comment.dto.CreateCommentRequest;
import kr.dgucaps.capsv4.domain.board.entity.Board;
import kr.dgucaps.capsv4.domain.comment.entity.Comment;
import kr.dgucaps.capsv4.domain.comment.exception.CommentNotAuthorException;
import kr.dgucaps.capsv4.domain.comment.exception.CommentNotFoundException;
import kr.dgucaps.capsv4.domain.comment.repository.CommentRepository;
import kr.dgucaps.capsv4.domain.user.entity.User;
import kr.dgucaps.capsv4.domain.board.repository.BoardRepository;
import kr.dgucaps.capsv4.domain.user.exception.UserNotFoundException;
import kr.dgucaps.capsv4.domain.user.repository.UserRepository;
import kr.dgucaps.capsv4.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @Transactional
    public void createComment(CreateCommentRequest request) {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
        Board board = boardRepository.findById(request.getBoardId())
                .orElseThrow(() -> new BoardNotFoundException(request.getBoardId()));
        commentRepository.save(request.toEntity(board, user));
    }

    @Transactional
    public void deleteComment(Integer commentId) {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException(commentId));
        if (!user.getUserId().equals(comment.getUser().getUserId())) {
            throw new CommentNotAuthorException();
        }
        commentRepository.deleteById(commentId);
    }
}
