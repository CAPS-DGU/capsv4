package kr.dgucaps.capsv4.error.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {

    // Common
    INVALID_INPUT_VALUE(400, "C001", "Invalid Input Value"),
    METHOD_NOT_ALLOWED(405, "C002", "Invalid Input Value"),
    ENTITY_NOT_FOUND(400, "C003", "Entity Not Found"),
    INTERNAL_SERVER_ERROR(500, "C004", "Server Error"),
    INVALID_TYPE_VALUE(400, "C005", "Invalid Type Value"),
    HANDLE_ACCESS_DENIED(403, "C006", "Access is Denied"),

    // Board
    BOARD_ALREADY_LIKED(400, "B001", "You have already liked this post"),
    BOARD_NOT_AUTHOR(400, "B002", "You are not the author of this post"),

    // User
    USER_ID_DUPLICATE(400, "U001", "User ID already exists"),

    // Comment
    COMMENT_NOT_AUTHOR(400, "CM001", "You are not the author of this comment"),

    // Study
    STUDY_CONFIG_NOT_SET(400, "S001", "Study Config Not Set"),
    STUDY_NOT_APPLICATION_PERIOD(400, "S002", "Study Not Application Period"),
    STUDY_APPLICATION_CLOSED(400, "S003", "Study Application Closed"),
    STUDY_ALREADY_APPLIED(400, "S004", "Study Already Applied"),
    STUDY_APPLICATION_ALREADY_PROCESSED(400, "S005", "Study Application already Processed"),
    STUDY_NOT_AUTHOR(400, "S006", "Study Not Author"),
    STUDY_NOT_APPLICANT(400, "S007", "Study Not Applicant"),

//    // Member
//    EMAIL_DUPLICATION(400, "M001", "Email is Duplication"),
//    LOGIN_INPUT_INVALID(400, "M002", "Login input is invalid"),
//
//    // Coupon
//    COUPON_ALREADY_USE(400, "CO001", "Coupon was already used"),
//    COUPON_EXPIRE(400, "CO002", "Coupon was already expired")
    ;

    private final String code;

    private final String message;

    private final int status;

    ErrorCode(final int status, final String code, final String message) {
        this.code = code;
        this.message = message;
        this.status = status;
    }
}
