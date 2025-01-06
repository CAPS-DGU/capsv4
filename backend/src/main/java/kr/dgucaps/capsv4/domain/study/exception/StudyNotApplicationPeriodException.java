package kr.dgucaps.capsv4.domain.study.exception;

import kr.dgucaps.capsv4.global.error.exception.BusinessException;
import kr.dgucaps.capsv4.global.error.exception.ErrorCode;

public class StudyNotApplicationPeriodException extends BusinessException {

    public StudyNotApplicationPeriodException() {
        super(ErrorCode.STUDY_NOT_APPLICATION_PERIOD);
    }
}
