package kr.dgucaps.capsv4.dto.request;

import jakarta.validation.constraints.*;
import kr.dgucaps.capsv4.entity.User;
import lombok.Data;

@Data
public class CreateUserRequest {

    @NotBlank
    @Size(min = 4, max = 12)
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "영문 대소문자와 숫자만 사용할 수 있습니다")
    private String userId;

    @NotBlank
    @Size(min = 8, max = 20)
    @Pattern(regexp = "^(?=.*[0-9])[a-zA-Z0-9]+$", message = "영문 대소문자와 숫자를 포함해야 합니다")
    private String password;

    @NotBlank
    @Pattern(regexp = "^[\\uAC00-\\uD7AF]{2,4}$", message = "2 ~ 4 자리의 정상적인 한글 이름을 사용해야 합니다")
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
