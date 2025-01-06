package kr.dgucaps.capsv4.domain.event.service;

import kr.dgucaps.capsv4.domain.event.entity.*;
import kr.dgucaps.capsv4.domain.event.exception.*;
import kr.dgucaps.capsv4.domain.event.repository.*;
import kr.dgucaps.capsv4.domain.user.entity.User;
import kr.dgucaps.capsv4.domain.user.exception.UserNotFoundException;
import kr.dgucaps.capsv4.domain.user.repository.UserRepository;
import kr.dgucaps.capsv4.domain.event.dto.ApplyEventRequest;
import kr.dgucaps.capsv4.domain.event.dto.CreateEventRequest;
import kr.dgucaps.capsv4.domain.event.dto.GetEventListParameter;
import kr.dgucaps.capsv4.domain.event.dto.ModifyEventRequest;
import kr.dgucaps.capsv4.domain.event.dto.GetEventListResponse;
import kr.dgucaps.capsv4.domain.event.dto.GetEventParticipantsResponse;
import kr.dgucaps.capsv4.domain.event.dto.GetEventResponse;
import kr.dgucaps.capsv4.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
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
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new EventNotFoundException(request.getEventId()));
        if (eventApplyRepository.existsByEventAndUser(event, user)) {
            throw new EventAlreadyAppliedException();
        }
        if (eventApplyRepository.countByEvent(event) >= event.getMaxParticipants()) {
            throw new EventClosedException();
        }
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(event.getStartDate()) || now.isAfter(event.getEndDate())) {
            throw new EventNotApplicationPeriodException();
        }
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
                .orElseThrow(() -> new EventNotFoundException(eventId));
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
                .orElseThrow(() -> new EventNotFoundException(eventId));
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

    @Transactional
    public void updateEvent(ModifyEventRequest request) {
        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new EventNotFoundException(request.getEventId()));
        if (eventApplyRepository.existsByEvent(event)) {
            throw new EventHasApplicantException();
        }
        if (request.getTitle() != null) {
            event.updateTitle(request.getTitle());
        }
        if (request.getStartDate() != null) {
            event.updateStartDate(request.getStartDate());
        }
        if (request.getEndDate() != null) {
            event.updateEndDate(request.getEndDate());
        }
        if (request.getMaxParticipants() != null) {
            event.updateMaxParticipants(request.getMaxParticipants());
        }
        if (request.getDescription() != null) {
            event.updateDescription(request.getDescription());
        }
        switch (getEventType(event)) {
            case SNACK:
                break;
            case QUIZ:
                EventQuiz eventQuiz = (EventQuiz) event;
                if (request.getQuiz().getQuestion() != null) {
                    eventQuiz.updateQuestion(request.getQuiz().getQuestion());
                }
                if (request.getQuiz().getCorrectAnswer() != null) {
                    eventQuiz.updateCorrectAnswer(request.getQuiz().getCorrectAnswer());
                }
                break;
        }
    }

    @Transactional
    public void deleteEvent(Integer eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));
        if (eventApplyRepository.existsByEvent(event)) {
            throw new EventHasApplicantException();
        }
        eventRepository.delete(event);
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
