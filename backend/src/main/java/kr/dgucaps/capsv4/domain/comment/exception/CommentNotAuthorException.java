package kr.dgucaps.capsv4.domain.comment.exception;

import kr.dgucaps.capsv4.global.error.exception.BusinessException;
import kr.dgucaps.capsv4.global.error.exception.ErrorCode;

public class CommentNotAuthorException extends BusinessException {

    public CommentNotAuthorException() {
        super(ErrorCode.COMMENT_NOT_AUTHOR);
    }
}
