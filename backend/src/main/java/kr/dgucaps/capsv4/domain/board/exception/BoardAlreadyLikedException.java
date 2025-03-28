package kr.dgucaps.capsv4.domain.board.exception;

import kr.dgucaps.capsv4.global.error.exception.BusinessException;
import kr.dgucaps.capsv4.global.error.exception.ErrorCode;

public class BoardAlreadyLikedException extends BusinessException {

    public BoardAlreadyLikedException() {
        super(ErrorCode.BOARD_ALREADY_LIKED);
    }
}
