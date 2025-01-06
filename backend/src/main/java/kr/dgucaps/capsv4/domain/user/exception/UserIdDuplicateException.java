package kr.dgucaps.capsv4.domain.user.exception;

import kr.dgucaps.capsv4.global.error.exception.ErrorCode;
import kr.dgucaps.capsv4.global.error.exception.InvalidValueException;

public class UserIdDuplicateException extends InvalidValueException {

    public UserIdDuplicateException(String target) {
        super(target, ErrorCode.USER_ID_DUPLICATE);
    }
}
