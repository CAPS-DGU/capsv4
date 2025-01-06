package kr.dgucaps.capsv4.domain.study.exception;

import kr.dgucaps.capsv4.global.error.exception.BusinessException;
import kr.dgucaps.capsv4.global.error.exception.ErrorCode;

public class StudyConfigNotSetException extends BusinessException {

    public StudyConfigNotSetException() {
        super(ErrorCode.STUDY_CONFIG_NOT_SET);
    }
}
