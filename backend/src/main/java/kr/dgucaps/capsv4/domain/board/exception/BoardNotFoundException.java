package kr.dgucaps.capsv4.domain.board.exception;

import kr.dgucaps.capsv4.global.error.exception.EntityNotFoundException;

public class BoardNotFoundException extends EntityNotFoundException {

    public BoardNotFoundException(Integer target) {
        super(target + " is not found");
    }
}
