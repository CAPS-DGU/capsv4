package kr.dgucaps.capsv4.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DuplicateUserException extends RuntimeException {

    private String message;
}
