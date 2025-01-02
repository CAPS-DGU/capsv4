package kr.dgucaps.capsv4.domain.user.dto;

import lombok.Data;

@Data
public class ModifyUserRequest {

    private String password;

    private String comment;
}
