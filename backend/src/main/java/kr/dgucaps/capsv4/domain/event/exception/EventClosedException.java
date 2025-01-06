package kr.dgucaps.capsv4.domain.event.exception;

import kr.dgucaps.capsv4.global.error.exception.BusinessException;
import kr.dgucaps.capsv4.global.error.exception.ErrorCode;

public class EventClosedException extends BusinessException {

    public EventClosedException() {
        super(ErrorCode.EVENT_CLOSED);
    }
}
