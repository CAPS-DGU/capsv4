package kr.dgucaps.capsv4.service;

import kr.dgucaps.capsv4.dto.request.CreateCommentRequest;
import kr.dgucaps.capsv4.entity.Board;
import kr.dgucaps.capsv4.entity.User;
import kr.dgucaps.capsv4.repository.BoardRepository;
import kr.dgucaps.capsv4.repository.CommentRepository;
import kr.dgucaps.capsv4.repository.UserRepository;
import kr.dgucaps.capsv4.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
                .orElseThrow(() -> new UsernameNotFoundException("해당 회원을 찾을 수 없습니다."));
        Board board = boardRepository.findById(request.getBoardId())
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다."));
        commentRepository.save(request.toEntity(board, user));
    }

    @Transactional
    public void deleteComment(Integer commentId) {
        commentRepository.deleteById(commentId);
    }
}
