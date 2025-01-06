package kr.dgucaps.capsv4.domain.vote.exception;

import kr.dgucaps.capsv4.error.exception.EntityNotFoundException;

public class VoteUserNotFoundException extends EntityNotFoundException {

    public VoteUserNotFoundException(Integer target1, Integer target2) {
        super(target1 + ", " + target2 + " is not found");
    }
}
