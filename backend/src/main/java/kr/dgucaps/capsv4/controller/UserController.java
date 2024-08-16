package kr.dgucaps.capsv4.controller;

import jakarta.validation.Valid;
import kr.dgucaps.capsv4.dto.request.CreateUserRequest;
import kr.dgucaps.capsv4.dto.request.FindUserIdRequest;
import kr.dgucaps.capsv4.dto.request.LoginRequest;
import kr.dgucaps.capsv4.dto.request.TokenRenewalRequest;
import kr.dgucaps.capsv4.dto.response.JwtToken;
import kr.dgucaps.capsv4.dto.response.common.DataResponse;
import kr.dgucaps.capsv4.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/user")
    public ResponseEntity<DataResponse> createUser(@RequestBody @Valid CreateUserRequest request) {
        userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(DataResponse.builder().message("회원가입 성공").build());
    }

    @PostMapping("/user/login")
    public ResponseEntity<DataResponse> login(@RequestBody @Valid LoginRequest request) {
        JwtToken jwtToken = userService.login(request);
        return ResponseEntity.ok(DataResponse.builder().message("로그인 성공").data(jwtToken).build());
    }

    @PostMapping("/user/findUserId")
    public ResponseEntity<DataResponse> findUserId(@RequestBody @Valid FindUserIdRequest request) {
        return ResponseEntity.ok(DataResponse.builder().message("사용자 아이디 찾기 성공").data(userService.findUserId(request)).build());
    }

    @PostMapping("/token/renewal")
    public ResponseEntity<DataResponse> renewalToken(@RequestBody @Valid TokenRenewalRequest request) {
        JwtToken jwtToken = userService.renewalToken(request);
        return ResponseEntity.ok(DataResponse.builder().message("토큰 재발급 성공").data(jwtToken).build());
    }
}
