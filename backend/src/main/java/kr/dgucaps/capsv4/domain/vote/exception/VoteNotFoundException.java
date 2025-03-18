package kr.dgucaps.capsv4.domain.vote.exception;

import kr.dgucaps.capsv4.global.error.exception.EntityNotFoundException;

public class VoteNotFoundException extends EntityNotFoundException {

    public VoteNotFoundException() {
        super("Vote is not found");
    }
}
