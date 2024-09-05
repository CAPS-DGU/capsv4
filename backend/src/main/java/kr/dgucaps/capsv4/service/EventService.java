package kr.dgucaps.capsv4.service;

import kr.dgucaps.capsv4.dto.request.CreateEventRequest;
import kr.dgucaps.capsv4.entity.*;
import kr.dgucaps.capsv4.repository.EventQuizRepository;
import kr.dgucaps.capsv4.repository.EventSnackRepository;
import kr.dgucaps.capsv4.repository.UserRepository;
import kr.dgucaps.capsv4.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EventService {

    private final UserRepository userRepository;
    private final EventQuizRepository eventQuizRepository;
    private final EventSnackRepository eventSnackRepository;

    @Transactional
    public void createEvent(CreateEventRequest request) {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UsernameNotFoundException("해당 회원을 찾을 수 없습니다"));
        switch (request.getType()) {
            case QUIZ:
                EventQuiz eventQuiz = EventQuiz.builder()
                        .user(user)
                        .title(request.getTitle())
                        .startDate(request.getStartDate())
                        .endDate(request.getEndDate())
                        .maxParticipants(request.getMaxParticipants())
                        .description(request.getDescription())
                        .question(request.getQuiz().getQuestion())
                        .correctAnswer(request.getQuiz().getCorrectAnswer())
                        .build();
                eventQuizRepository.save(eventQuiz);
                break;
            case SNACK:
                EventSnack eventSnack = EventSnack.builder()
                        .user(user)
                        .title(request.getTitle())
                        .startDate(request.getStartDate())
                        .endDate(request.getEndDate())
                        .maxParticipants(request.getMaxParticipants())
                        .description(request.getDescription())
                        .build();
                eventSnackRepository.save(eventSnack);
        }
    }
}
