package kr.dgucaps.capsv4.domain.study.exception;

import kr.dgucaps.capsv4.global.error.exception.EntityNotFoundException;

public class StudyApplyNotFoundException extends EntityNotFoundException {

    public StudyApplyNotFoundException(Integer target1, Integer target2) {
        super(target1 + ", " + target2 + " is not found");
    }
}
