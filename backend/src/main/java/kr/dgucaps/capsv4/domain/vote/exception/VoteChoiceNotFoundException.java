package kr.dgucaps.capsv4.domain.vote.exception;

import kr.dgucaps.capsv4.global.error.exception.EntityNotFoundException;

public class VoteChoiceNotFoundException extends EntityNotFoundException {

    public VoteChoiceNotFoundException(Integer target) {
        super(target + " is not found");
    }
}
