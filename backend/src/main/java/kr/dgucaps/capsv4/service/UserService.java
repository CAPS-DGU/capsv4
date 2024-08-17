package kr.dgucaps.capsv4.service;

import kr.dgucaps.capsv4.dto.request.CreateUserRequest;
import kr.dgucaps.capsv4.dto.request.FindUserIdRequest;
import kr.dgucaps.capsv4.dto.request.LoginRequest;
import kr.dgucaps.capsv4.dto.request.TokenRenewalRequest;
import kr.dgucaps.capsv4.dto.response.FindUserIdResponse;
import kr.dgucaps.capsv4.dto.response.JwtToken;
import kr.dgucaps.capsv4.entity.User;
import kr.dgucaps.capsv4.exception.DuplicateUserException;
import kr.dgucaps.capsv4.repository.UserRepository;
import kr.dgucaps.capsv4.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public void createUser(CreateUserRequest request) {
        isDuplicated(request.getUserId());
        userRepository.save(request.toEntity(passwordEncoder.encode(request.getPassword())));
    }

    public JwtToken login(LoginRequest request) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(request.getUserId(), request.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        return jwtTokenProvider.generateToken(authentication);
    }

    public FindUserIdResponse findUserId(FindUserIdRequest request) {
        User user = userRepository.findByNameAndEmail(request.getName(), request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 회원입니다."));
        return FindUserIdResponse.builder().userId(user.getUserId()).build();
    }

    public void validateUserId(String userId) {
        isDuplicated(userId);
    }

    public JwtToken renewalToken(TokenRenewalRequest request) {
        String token = request.getRefreshToken();
        if (jwtTokenProvider.validateToken(token)) {
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            return jwtTokenProvider.generateToken(authentication);
        }
        return null;
    }

    private void isDuplicated(String userId) {
        if (userRepository.existsByUserId(userId)) {
            throw new DuplicateUserException("이미 사용중인 사용자명 입니다.");
        }
    }
}
