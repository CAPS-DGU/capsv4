package kr.dgucaps.capsv4.domain.event.exception;

import kr.dgucaps.capsv4.error.exception.BusinessException;
import kr.dgucaps.capsv4.error.exception.ErrorCode;

public class EventClosedException extends BusinessException {

    public EventClosedException() {
        super(ErrorCode.EVENT_CLOSED);
    }
}
