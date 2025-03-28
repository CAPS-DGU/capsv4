package kr.dgucaps.capsv4.domain.board.exception;

import kr.dgucaps.capsv4.global.error.exception.BusinessException;
import kr.dgucaps.capsv4.global.error.exception.ErrorCode;

public class BoardNotAuthorException extends BusinessException {

    public BoardNotAuthorException() {
        super(ErrorCode.BOARD_NOT_AUTHOR);
    }
}
