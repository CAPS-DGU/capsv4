package kr.dgucaps.capsv4.dto.response;

import kr.dgucaps.capsv4.entity.UserPermission;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class GetUserResponse {

    private Integer id;

    private UserPermission permission;

    private String userId;

    private String name;

    private Integer grade;

    private String email;

    private String comment;

    private String imageName;

    private Integer point;

    private Integer totalPoint;

    private LocalDate lastLoginDate;

    private Boolean isDeleted;
}
