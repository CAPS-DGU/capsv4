package kr.dgucaps.capsv4.service;

import kr.dgucaps.capsv4.dto.request.CreateBoardRequest;
import kr.dgucaps.capsv4.entity.Board;
import kr.dgucaps.capsv4.entity.UploadFile;
import kr.dgucaps.capsv4.entity.User;
import kr.dgucaps.capsv4.repository.BoardRepository;
import kr.dgucaps.capsv4.repository.UserRepository;
import kr.dgucaps.capsv4.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final UploadFileService uploadFileService;

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
}
