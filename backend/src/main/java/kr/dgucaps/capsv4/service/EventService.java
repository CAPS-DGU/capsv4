package kr.dgucaps.capsv4.service;

import kr.dgucaps.capsv4.dto.request.ApplyEventRequest;
import kr.dgucaps.capsv4.dto.request.CreateEventRequest;
import kr.dgucaps.capsv4.dto.request.GetEventListParameter;
import kr.dgucaps.capsv4.dto.response.GetEventListResponse;
import kr.dgucaps.capsv4.dto.response.GetEventParticipantsResponse;
import kr.dgucaps.capsv4.dto.response.GetEventResponse;
import kr.dgucaps.capsv4.entity.*;
import kr.dgucaps.capsv4.repository.*;
import kr.dgucaps.capsv4.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    private final EventApplyRepository eventApplyRepository;

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

    public List<GetEventListResponse> getEventList(GetEventListParameter parameter) {
        Pageable pageable = PageRequest.of(parameter.getPage(), 10, Sort.by(Sort.Direction.DESC, "id"));
        String keyword = parameter.getKeyword();
        Page<Event> events;
        if (keyword != null && !keyword.isEmpty()) {
            events = eventRepository.findByTitleContaining(keyword, pageable);
        } else {
            events = eventRepository.findAll(pageable);
        }
        int totalPages = events.getTotalPages();
        return events.stream()
                .map(event -> GetEventListResponse.builder()
                        .id(event.getId())
                        .writer(GetEventListResponse.Writer.builder()
                                .id(event.getUser().getId())
                                .grade(event.getUser().getGrade())
                                .name(event.getUser().getName())
                                .build())
                        .type(getEventType(event))
                        .title(event.getTitle())
                        .startDate(event.getStartDate())
                        .endDate(event.getEndDate())
                        .maxParticipants(event.getMaxParticipants())
                        .totalPages(totalPages)
                        .build()
                )
                .collect(Collectors.toList());
    }

    public GetEventResponse getEvent(Integer eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("해당 이벤트를 찾을 수 없습니다"));
        GetEventResponse.GetEventResponseBuilder builder = GetEventResponse.builder()
                .id(event.getId())
                .writer(GetEventResponse.Writer.builder()
                        .id(event.getUser().getId())
                        .grade(event.getUser().getGrade())
                        .name(event.getUser().getName())
                        .build())
                .type(getEventType(event))
                .title(event.getTitle())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .maxParticipants(event.getMaxParticipants())
                .description(event.getDescription());
        if (getEventType(event).equals(EventType.QUIZ)) {
            EventQuiz eventQuiz = (EventQuiz) event;
            builder.quiz(GetEventResponse.Quiz.builder()
                    .question(eventQuiz.getQuestion())
                    .correctAnswer(eventQuiz.getCorrectAnswer())
                    .build());
        }
        return builder.build();
    }

    public List<GetEventParticipantsResponse> getEventParticipants(Integer eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("해당 이벤트를 찾을 수 없습니다"));
        List<EventApply> eventApplyList = eventApplyRepository.findByEvent(event);
        List<GetEventParticipantsResponse> eventParticipants = new ArrayList<>();
        for (EventApply eventApply : eventApplyList) {
            GetEventParticipantsResponse.GetEventParticipantsResponseBuilder builder = GetEventParticipantsResponse.builder()
                    .id(eventApply.getId())
                    .user(GetEventParticipantsResponse.User.builder()
                            .id(eventApply.getUser().getId())
                            .grade(eventApply.getUser().getGrade())
                            .name(eventApply.getUser().getName())
                            .build())
                    .date(eventApply.getDateTime());
            switch (getEventType(event)) {
                case SNACK:
                    EventSnackApply eventSnackApply = (EventSnackApply) eventApply;
                    builder.snack(GetEventParticipantsResponse.Snack.builder()
                            .phone(eventSnackApply.getPhone())
                            .build());
                    break;
                case QUIZ:
                    EventQuizApply eventQuizApply = (EventQuizApply) eventApply;
                    builder.quiz(GetEventParticipantsResponse.Quiz.builder()
                            .answer(eventQuizApply.getAnswer())
                            .build());
                    break;
            }
            eventParticipants.add(builder.build());
        }
        return eventParticipants;
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
