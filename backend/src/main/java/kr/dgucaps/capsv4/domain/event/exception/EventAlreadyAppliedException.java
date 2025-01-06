package kr.dgucaps.capsv4.domain.event.exception;

import kr.dgucaps.capsv4.global.error.exception.BusinessException;
import kr.dgucaps.capsv4.global.error.exception.ErrorCode;

public class EventAlreadyAppliedException extends BusinessException {

    public EventAlreadyAppliedException() {
        super(ErrorCode.EVENT_ALREADY_APPLIED);
    }
}
