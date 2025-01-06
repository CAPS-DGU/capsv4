package kr.dgucaps.capsv4.domain.vote.exception;

import kr.dgucaps.capsv4.error.exception.BusinessException;
import kr.dgucaps.capsv4.error.exception.ErrorCode;

public class VoteAlreadyCompleted extends BusinessException {

    public VoteAlreadyCompleted() {
        super(ErrorCode.VOTE_ALREADY_COMPLETED);
    }
}
