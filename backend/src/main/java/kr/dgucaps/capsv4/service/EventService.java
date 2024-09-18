package kr.dgucaps.capsv4.service;

import kr.dgucaps.capsv4.dto.request.ApplyEventRequest;
import kr.dgucaps.capsv4.dto.request.CreateEventRequest;
import kr.dgucaps.capsv4.entity.*;
import kr.dgucaps.capsv4.repository.*;
import kr.dgucaps.capsv4.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EventService {

    private final UserRepository userRepository;
    private final EventQuizRepository eventQuizRepository;
    private final EventSnackRepository eventSnackRepository;
    private final EventRepository eventRepository;
    private final EventSnackApplyRepository eventSnackApplyRepository;
    private final EventQuizApplyRepository eventQuizApplyRepository;

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

    @Transactional
    public void createApply(ApplyEventRequest request) {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UsernameNotFoundException("해당 회원을 찾을 수 없습니다"));
        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new IllegalArgumentException("이벤트가 존재하지 않습니다"));
        switch (getEventType(event)) {
            case SNACK:
                EventSnackApply eventSnackApply = EventSnackApply.builder()
                        .event(event)
                        .user(user)
                        .dateTime(LocalDateTime.now())
                        .phone(request.getSnack().getPhone())
                        .build();
                eventSnackApplyRepository.save(eventSnackApply);
                break;
            case QUIZ:
                EventQuizApply eventQuizApply = EventQuizApply.builder()
                        .event(event)
                        .user(user)
                        .dateTime(LocalDateTime.now())
                        .answer(request.getQuiz().getAnswer())
                        .build();
                eventQuizApplyRepository.save(eventQuizApply);
                break;
        }
    }

    private EventType getEventType(Event event) {
        if (event instanceof EventSnack) {
            return EventType.SNACK;
        } else if (event instanceof EventQuiz) {
            return EventType.QUIZ;
        }
        return EventType.SNACK;
    }
}
