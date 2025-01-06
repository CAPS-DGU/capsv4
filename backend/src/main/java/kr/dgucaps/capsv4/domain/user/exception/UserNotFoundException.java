package kr.dgucaps.capsv4.domain.user.exception;

import kr.dgucaps.capsv4.global.error.exception.EntityNotFoundException;

public class UserNotFoundException extends EntityNotFoundException {

    public UserNotFoundException(String target) {
        super(target + " is not found");
    }

    public UserNotFoundException(Integer target) {
        super(target + " is not found");
    }
}
