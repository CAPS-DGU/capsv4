package kr.dgucaps.capsv4.domain.event.exception;

import kr.dgucaps.capsv4.error.exception.EntityNotFoundException;

public class EventNotFoundException extends EntityNotFoundException {

    public EventNotFoundException(Integer target) {
        super(target + " is not found");
    }
}
