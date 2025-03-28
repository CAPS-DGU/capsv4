package kr.dgucaps.capsv4.domain.event.exception;

import kr.dgucaps.capsv4.global.error.exception.BusinessException;
import kr.dgucaps.capsv4.global.error.exception.ErrorCode;

public class EventNotApplicationPeriodException extends BusinessException {

    public EventNotApplicationPeriodException() {
        super(ErrorCode.EVENT_NOT_APPLICATION_PERIOD);
    }
}
