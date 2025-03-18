package kr.dgucaps.capsv4.domain.study.exception;

import kr.dgucaps.capsv4.global.error.exception.BusinessException;
import kr.dgucaps.capsv4.global.error.exception.ErrorCode;

public class StudyAlreadyAppliedException extends BusinessException {

    public StudyAlreadyAppliedException() {
        super(ErrorCode.STUDY_ALREADY_APPLIED);
    }
}
