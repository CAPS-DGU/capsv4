package kr.dgucaps.capsv4.domain.study.exception;

import kr.dgucaps.capsv4.error.exception.EntityNotFoundException;

public class StudyNotFoundException extends EntityNotFoundException {

    public StudyNotFoundException(Integer target) {
        super(target + " is not found");
    }
}
