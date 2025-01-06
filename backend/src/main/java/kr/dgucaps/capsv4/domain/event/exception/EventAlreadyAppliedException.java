package kr.dgucaps.capsv4.domain.event.exception;

import kr.dgucaps.capsv4.error.exception.BusinessException;
import kr.dgucaps.capsv4.error.exception.ErrorCode;

public class EventAlreadyAppliedException extends BusinessException {

    public EventAlreadyAppliedException() {
        super(ErrorCode.EVENT_ALREADY_APPLIED);
    }
}
