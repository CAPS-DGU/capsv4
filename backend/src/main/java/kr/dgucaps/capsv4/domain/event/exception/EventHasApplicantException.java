package kr.dgucaps.capsv4.domain.event.exception;

import kr.dgucaps.capsv4.global.error.exception.BusinessException;
import kr.dgucaps.capsv4.global.error.exception.ErrorCode;

public class EventHasApplicantException extends BusinessException {

    public EventHasApplicantException() {
        super(ErrorCode.EVENT_HAS_APPLICANT);
    }
}
