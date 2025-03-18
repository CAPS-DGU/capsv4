package kr.dgucaps.capsv4.domain.vote.exception;

import kr.dgucaps.capsv4.global.error.exception.BusinessException;
import kr.dgucaps.capsv4.global.error.exception.ErrorCode;

public class VoteNotPeriodException extends BusinessException {

    public VoteNotPeriodException() {
        super(ErrorCode.VOTE_NOT_PERIOD);
    }
}
