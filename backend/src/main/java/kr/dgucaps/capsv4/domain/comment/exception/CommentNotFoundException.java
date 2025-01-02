package kr.dgucaps.capsv4.domain.comment.exception;

import kr.dgucaps.capsv4.error.exception.EntityNotFoundException;

public class CommentNotFoundException extends EntityNotFoundException {

    public CommentNotFoundException(Integer target) {
        super(target + " is not found");
    }
}
