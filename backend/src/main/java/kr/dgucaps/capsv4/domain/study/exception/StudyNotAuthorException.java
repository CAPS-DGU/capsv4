package kr.dgucaps.capsv4.domain.study.exception;

import kr.dgucaps.capsv4.global.error.exception.BusinessException;
import kr.dgucaps.capsv4.global.error.exception.ErrorCode;

public class StudyNotAuthorException extends BusinessException {

    public StudyNotAuthorException() {
        super(ErrorCode.STUDY_NOT_AUTHOR);
    }
}
