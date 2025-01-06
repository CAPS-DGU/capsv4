package kr.dgucaps.capsv4.domain.vote.exception;

import kr.dgucaps.capsv4.global.error.exception.BusinessException;
import kr.dgucaps.capsv4.global.error.exception.ErrorCode;

public class VoteNotOpen extends BusinessException {

    public VoteNotOpen() {
        super(ErrorCode.VOTE_NOT_OPEN);
    }
}
