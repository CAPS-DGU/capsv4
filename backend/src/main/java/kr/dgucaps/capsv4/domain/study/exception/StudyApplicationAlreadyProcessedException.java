package kr.dgucaps.capsv4.domain.study.exception;

import kr.dgucaps.capsv4.global.error.exception.BusinessException;
import kr.dgucaps.capsv4.global.error.exception.ErrorCode;

public class StudyApplicationAlreadyProcessedException extends BusinessException {

    public StudyApplicationAlreadyProcessedException() {
        super(ErrorCode.STUDY_APPLICATION_ALREADY_PROCESSED);
    }
}
