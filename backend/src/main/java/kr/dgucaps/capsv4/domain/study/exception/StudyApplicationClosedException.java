package kr.dgucaps.capsv4.domain.study.exception;

import kr.dgucaps.capsv4.global.error.exception.BusinessException;
import kr.dgucaps.capsv4.global.error.exception.ErrorCode;

public class StudyApplicationClosedException extends BusinessException {

    public StudyApplicationClosedException() {
        super(ErrorCode.STUDY_APPLICATION_CLOSED);
    }
}
