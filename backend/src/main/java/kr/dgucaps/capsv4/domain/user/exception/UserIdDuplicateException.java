package kr.dgucaps.capsv4.domain.user.exception;

import kr.dgucaps.capsv4.error.exception.ErrorCode;
import kr.dgucaps.capsv4.error.exception.InvalidValueException;

public class UserIdDuplicateException extends InvalidValueException {

    public UserIdDuplicateException(String target) {
        super(target, ErrorCode.USER_ID_DUPLICATE);
    }
}
