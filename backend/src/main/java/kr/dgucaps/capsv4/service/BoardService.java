package kr.dgucaps.capsv4.service;

import kr.dgucaps.capsv4.dto.request.CreateBoardRequest;
import kr.dgucaps.capsv4.dto.request.GetBoardListParameter;
import kr.dgucaps.capsv4.dto.request.ModifyBoardRequest;
import kr.dgucaps.capsv4.dto.response.GetBoardListResponse;
import kr.dgucaps.capsv4.dto.response.GetBoardResponse;
import kr.dgucaps.capsv4.entity.*;
import kr.dgucaps.capsv4.repository.*;
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
import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final UploadFileService uploadFileService;
    private final UploadFileRepository uploadFileRepository;
    private final BoardLikeRepository boardLikeRepository;
    private final BoardModifyRepository boardModifyRepository;

    @Transactional
    public void createBoard(CreateBoardRequest request) throws IOException {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UsernameNotFoundException("해당 회원을 찾을 수 없습니다."));
        Board board = request.toEntity(user);
        boardRepository.save(board);
        if (request.getFiles() != null && !request.getFiles().isEmpty()) {
            for (MultipartFile file : request.getFiles()) {
                UploadFile uploadFile = uploadFileService.store(file, board);
                board.getUploadFiles().add(uploadFile);
            }
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
        int totalPages = boards.getTotalPages();
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
                        .totalPages(totalPages)
                        .build()
                )
                .collect(Collectors.toList());
    }

    @Transactional
    public GetBoardResponse getBoard(Integer boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다"));
        board.updateHit();
        return GetBoardResponse.builder()
                .id(board.getId())
                .writer(GetBoardResponse.Writer.builder()
                        .id(board.getUser().getId())
                        .grade(board.getUser().getGrade())
                        .name(board.getUser().getName())
                        .build())
                .isDeleted(board.getIsDeleted())
                .isModified(board.getIsModified())
                .category(board.getCategory())
                .title(board.getTitle())
                .time(board.getDatetime())
                .hit(board.getHit())
                .content(board.getContent())
                .like(board.getBoardLikes().size())
                .comments(board.getComments().stream()
                        .filter(comment -> comment.getTarget() == 0)
                        .map(comment -> mapToCommentDto(comment, board.getComments()))
                        .collect(Collectors.toList())
                )
                .files(board.getUploadFiles().stream()
                        .map(file -> GetBoardResponse.File.builder()
                                .fileId(file.getId())
                                .url("upload/file/" + file.getName())
                                .title(file.getTitle())
                                .build()
                        )
                        .collect(Collectors.toList())
                )
                .build();
    }

    @Transactional
    public void modifyBoard(Integer boardId, ModifyBoardRequest request) throws IOException {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UsernameNotFoundException("해당 회원을 찾을 수 없습니다."));
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다."));
        if (!user.getUserId().equals(board.getUser().getUserId())) {
            throw new AccessDeniedException("해당 게시글을 수정할 권한이 없습니다");
        }
        BoardModify boardModify = BoardModify.builder()
                .board(board)
                .category(board.getCategory())
                .title(board.getTitle())
                .content(board.getContent())
                .build();
        boardModifyRepository.save(boardModify);
        board.markModified();
        if (request.getCategory() != null) {
            board.updateCategory(request.getCategory());
        }
        if (request.getTitle() != null) {
            board.updateTitle(request.getTitle());
        }
        if (request.getContent() != null) {
            board.updateContent(request.getContent());
        }
        if (request.getFiles() != null && !request.getFiles().isEmpty()) {
            uploadFileRepository.deleteAll(board.getUploadFiles());
            board.getUploadFiles().clear();
            for (MultipartFile file : request.getFiles()) {
                UploadFile uploadFile = uploadFileService.store(file, board);
                board.getUploadFiles().add(uploadFile);
            }
        }
    }

    @Transactional
    public void deleteBoard(Integer boardId) throws AccessDeniedException {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UsernameNotFoundException("해당 회원을 찾을 수 없습니다."));
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다."));
        if (!user.getUserId().equals(board.getUser().getUserId())) {
            throw new AccessDeniedException("해당 게시글을 삭제할 권한이 없습니다");
        }
        boardRepository.delete(board);
    }

    private GetBoardResponse.Comment mapToCommentDto(Comment comment, List<Comment> allComments) {
        return GetBoardResponse.Comment.builder()
                .id(comment.getId())
                .writer(GetBoardResponse.Writer.builder()
                        .id(comment.getUser().getId())
                        .grade(comment.getUser().getGrade())
                        .name(comment.getUser().getName())
                        .build())
                .isDeleted(comment.getIsDeleted())
                .targetId(comment.getTarget())
                .content(comment.getContent())
                .time(comment.getDateTime())
                .comments(allComments.stream()
                        .filter(reply -> reply.getTarget().equals(comment.getId()))
                        .map(reply -> mapToCommentDto(reply, allComments))
                        .collect(Collectors.toList())
                )
                .build();
    }
}
