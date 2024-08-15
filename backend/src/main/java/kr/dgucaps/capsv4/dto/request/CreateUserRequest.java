package kr.dgucaps.capsv4.dto.request;

import jakarta.validation.constraints.*;
import kr.dgucaps.capsv4.entity.User;
import lombok.Data;

@Data
public class CreateUserRequest {

    @NotBlank
    private String userId;

    @NotBlank
    private String password;

    @NotBlank
    private String name;

    @NotNull
    @Min(0)
    private Integer grade;

    @NotBlank
    @Email
    private String email;

    public User toEntity(String encodedPassword) {
        return User.builder()
                .userId(userId)
                .password(encodedPassword)
                .name(name)
                .grade(grade)
                .email(email)
                .build();
    }
}
