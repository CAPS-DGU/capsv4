package kr.dgucaps.capsv4.domain.board.service;

import kr.dgucaps.capsv4.domain.board.entity.Board;
import kr.dgucaps.capsv4.domain.board.entity.BoardLike;
import kr.dgucaps.capsv4.domain.board.entity.BoardModify;
import kr.dgucaps.capsv4.domain.board.entity.UploadFile;
import kr.dgucaps.capsv4.domain.board.exception.BoardAlreadyLikedException;
import kr.dgucaps.capsv4.domain.board.exception.BoardNotAuthorException;
import kr.dgucaps.capsv4.domain.board.exception.BoardNotFoundException;
import kr.dgucaps.capsv4.domain.board.repository.BoardLikeRepository;
import kr.dgucaps.capsv4.domain.board.repository.BoardModifyRepository;
import kr.dgucaps.capsv4.domain.board.repository.BoardRepository;
import kr.dgucaps.capsv4.domain.file.repository.UploadFileRepository;
import kr.dgucaps.capsv4.domain.comment.entity.Comment;
import kr.dgucaps.capsv4.domain.file.service.UploadFileService;
import kr.dgucaps.capsv4.domain.user.entity.User;
import kr.dgucaps.capsv4.domain.user.exception.UserNotFoundException;
import kr.dgucaps.capsv4.domain.board.dto.CreateBoardRequest;
import kr.dgucaps.capsv4.domain.board.dto.GetBoardListParameter;
import kr.dgucaps.capsv4.domain.board.dto.ModifyBoardRequest;
import kr.dgucaps.capsv4.domain.board.dto.GetBoardListResponse;
import kr.dgucaps.capsv4.domain.board.dto.GetBoardResponse;
import kr.dgucaps.capsv4.domain.user.repository.UserRepository;
import kr.dgucaps.capsv4.global.security.SecurityUtil;
import kr.dgucaps.capsv4.domain.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    private final UploadFileRepository uploadFileRepository;
    private final BoardLikeRepository boardLikeRepository;
    private final BoardModifyRepository boardModifyRepository;
    private final NotificationService notificationService;

    @Transactional
    public void createBoard(CreateBoardRequest request) throws IOException {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
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
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new BoardNotFoundException(boardId));
        if (boardLikeRepository.existsByBoardAndUser(board, user)) {
            throw new BoardAlreadyLikedException();
        }
        boardLikeRepository.save(BoardLike.builder()
                .board(board)
                .user(user)
                .build());

        User boardOwner = board.getUser();
        String notificationLink = "/board/" + board.getId();
        notificationService.createNotification(boardOwner, "2", notificationLink);
    }

    public List<GetBoardListResponse> getBoardListByCategory(GetBoardListParameter parameter) {
        Pageable pageable = PageRequest.of(parameter.getPage(), 10, Sort.by(Sort.Direction.DESC, "id"));
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
                .orElseThrow(() -> new BoardNotFoundException(boardId));
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
        Board board = validateBoardAuthor(boardId);
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
    public void deleteBoard(Integer boardId) {
        Board board = validateBoardAuthor(boardId);
        boardRepository.delete(board);
    }

    private Board validateBoardAuthor(Integer boardId) {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new BoardNotFoundException(boardId));
        if (!user.getUserId().equals(board.getUser().getUserId())) {
            throw new BoardNotAuthorException();
        }
        return board;
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
