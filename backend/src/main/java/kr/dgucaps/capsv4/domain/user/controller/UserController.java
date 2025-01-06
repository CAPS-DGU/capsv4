package kr.dgucaps.capsv4.domain.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import kr.dgucaps.capsv4.domain.user.dto.*;
import kr.dgucaps.capsv4.global.DataResponse;
import kr.dgucaps.capsv4.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "User", description = "사용자 API")
public class UserController {

    private final UserService userService;

    @PostMapping("/user")
    @Operation(summary = "회원가입")
    public ResponseEntity<DataResponse> createUser(@RequestBody @Valid CreateUserRequest request) {
        userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(DataResponse.builder().message("회원가입 성공").build());
    }

    @PostMapping("/user/login")
    @Operation(summary = "로그인")
    public ResponseEntity<DataResponse> login(@RequestBody @Valid LoginRequest request) {
        JwtToken jwtToken = userService.login(request);
        return ResponseEntity.ok(DataResponse.builder().message("로그인 성공").data(jwtToken).build());
    }

    @PostMapping("/user/findUserId")
    @Operation(summary = "아이디 찾기")
    public ResponseEntity<DataResponse> findUserId(@RequestBody @Valid FindUserIdRequest request) {
        return ResponseEntity.ok(DataResponse.builder().message("사용자 아이디 찾기 성공").data(userService.findUserId(request)).build());
    }

    @GetMapping("/user/{userId}/validate")
    @Operation(summary = "아이디 중복 검사", description = "회원가입 중 아이디 중복 검사시 사용")
    public ResponseEntity<DataResponse> validateUserId(@PathVariable("userId") String userId) {
        userService.validateUserId(userId);
        return ResponseEntity.ok(DataResponse.builder().message("사용 가능한 아이디").build());
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "회원 조회", description = "회원 정보 조회")
    public ResponseEntity<DataResponse> getUser(@PathVariable("userId") String userId) {
        return ResponseEntity.ok(DataResponse.builder().message("회원 조회 성공").data(userService.getUser(userId)).build());
    }

    @PatchMapping("/user/{userId}")
    @Operation(summary = "회원 정보 수정", description = "수정이 필요하지 않은 필드는 null")
    public ResponseEntity<DataResponse> updateUser(@PathVariable("userId") String userId, @RequestBody @Valid ModifyUserRequest request) {
        userService.updateUser(userId, request);
        return ResponseEntity.ok(DataResponse.builder().message("회원 수정 성공").build());
    }

    @DeleteMapping("/user/{userId}")
    @Operation(summary = "회원 탈퇴")
    public ResponseEntity<DataResponse> deleteUser(@PathVariable("userId") String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok(DataResponse.builder().message("회원 탈퇴 성공").build());
    }

    @PostMapping("/token/renewal")
    @Operation(summary = "토큰 재발급", description = "access token 만료시, refresh token 으로 재발급 요청 (Bearer 제외)")
    public ResponseEntity<DataResponse> renewalToken(@RequestBody @Valid TokenRenewalRequest request) {
        JwtToken jwtToken = userService.renewalToken(request);
        return ResponseEntity.ok(DataResponse.builder().message("토큰 재발급 성공").data(jwtToken).build());
    }
}
