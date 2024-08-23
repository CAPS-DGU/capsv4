package kr.dgucaps.capsv4.service;

import kr.dgucaps.capsv4.dto.request.CreateBoardRequest;
import kr.dgucaps.capsv4.dto.request.GetBoardListParameter;
import kr.dgucaps.capsv4.dto.response.GetBoardListResponse;
import kr.dgucaps.capsv4.entity.Board;
import kr.dgucaps.capsv4.entity.BoardLike;
import kr.dgucaps.capsv4.entity.UploadFile;
import kr.dgucaps.capsv4.entity.User;
import kr.dgucaps.capsv4.repository.BoardLikeRepository;
import kr.dgucaps.capsv4.repository.BoardRepository;
import kr.dgucaps.capsv4.repository.UserRepository;
import kr.dgucaps.capsv4.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final UploadFileService uploadFileService;
    private final BoardLikeRepository boardLikeRepository;

    @Transactional
    public void createBoard(CreateBoardRequest request) throws IOException {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UsernameNotFoundException("해당 회원을 찾을 수 없습니다."));
        Board board = request.toEntity(user);
        boardRepository.save(board);
        for (MultipartFile file : request.getFiles()) {
            UploadFile uploadFile = uploadFileService.store(file, board);
            board.getUploadFiles().add(uploadFile);
        }
    }

    @Transactional
    public void likeBoard(Integer boardId) {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UsernameNotFoundException("해당 회원을 찾을 수 없습니다."));
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다."));
        if (boardLikeRepository.existsByBoardAndUser(board, user)) {
            throw new IllegalStateException("이미 좋아요 한 게시글입니다");
        }
        boardLikeRepository.save(BoardLike.builder()
                        .board(board)
                        .user(user)
                        .build());
    }

    public List<GetBoardListResponse> getBoardListByCategory(GetBoardListParameter parameter) {
        Pageable pageable = PageRequest.of(parameter.getPage(), 10);
        String search = parameter.getSearch();
        Integer category = parameter.getCategory();
        Page<Board> boards;
        if (search != null && !search.isEmpty()) {
            boards = boardRepository.findByCategoryAndTitleContaining(category, search, pageable);
        } else {
            boards = boardRepository.findByCategory(category, pageable);
        }
        return boards.stream()
                .map(board -> GetBoardListResponse.builder()
                        .id(board.getId())
                        .writer(GetBoardListResponse.Writer.builder()
                                .id(board.getUser().getId())
                                .grade(board.getUser().getGrade())
                                .name(board.getUser().getName())
                                .build())
                        .category(board.getCategory())
                        .title(board.getTitle())
                        .time(board.getDatetime())
                        .hit(board.getHit())
                        .comments(board.getComments().size())
                        .likes(board.getBoardLikes().size())
                        .build()
                )
                .collect(Collectors.toList());
    }
}
