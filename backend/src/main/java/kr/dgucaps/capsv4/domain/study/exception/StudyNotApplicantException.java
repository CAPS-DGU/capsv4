package kr.dgucaps.capsv4.domain.study.exception;

import kr.dgucaps.capsv4.error.exception.BusinessException;
import kr.dgucaps.capsv4.error.exception.ErrorCode;

public class StudyNotApplicantException extends BusinessException {

    public StudyNotApplicantException() {
        super(ErrorCode.STUDY_NOT_APPLICANT);
    }
}
