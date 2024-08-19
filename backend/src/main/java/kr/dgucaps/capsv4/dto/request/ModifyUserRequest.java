package kr.dgucaps.capsv4.dto.request;

import lombok.Data;

@Data
public class ModifyUserRequest {

    private String password;

    private String comment;
}
