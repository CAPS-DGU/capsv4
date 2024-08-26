package kr.dgucaps.capsv4.service;

import kr.dgucaps.capsv4.dto.request.AcceptStudyRequest;
import kr.dgucaps.capsv4.dto.request.CreateStudyRequest;
import kr.dgucaps.capsv4.dto.request.GetStudyListParameter;
import kr.dgucaps.capsv4.dto.response.GetStudyListResponse;
import kr.dgucaps.capsv4.dto.response.GetStudyResponse;
import kr.dgucaps.capsv4.entity.*;
import kr.dgucaps.capsv4.repository.*;
import kr.dgucaps.capsv4.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StudyService {

    private final StudyRepository studyRepository;
    private final UserRepository userRepository;
    private final StudyFileService studyFileService;
    private final StudyConfigRepository studyConfigRepository;
    private final StudyApplyRepository studyApplyRepository;
    private final StudyTuteeRepository studyTuteeRepository;

    @Transactional
    public void createStudy(CreateStudyRequest request) throws IOException {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UsernameNotFoundException("해당 회원을 찾을 수 없습니다."));
        Study study = request.toEntity(user);
        studyRepository.save(study);
        for (MultipartFile file : request.getFiles()) {
            StudyFile studyFile = studyFileService.store(file, study);
            study.getStudyFiles().add(studyFile);
        }
    }

    @Transactional
    public void applyStudy(Integer studyId) {
        String applyStartDateString = studyConfigRepository.findByConfigKey("APPLY_START_DATE")
                .orElseThrow(() -> new IllegalArgumentException("지원 시작일 설정이 존재하지 않습니다")).getConfigValue();
        String applyEndDateString = studyConfigRepository.findByConfigKey("APPLY_END_DATE")
                .orElseThrow(() -> new IllegalArgumentException("지원 마감일 설정이 존재하지 않습니다")).getConfigValue();
        LocalDate applyStartDate = LocalDate.parse(applyStartDateString);
        LocalDate applyEndDate = LocalDate.parse(applyEndDateString);
        LocalDate currentDate = LocalDate.now();
        if (currentDate.isBefore(applyStartDate) || currentDate.isAfter(applyEndDate)) {
            throw new IllegalStateException("현재는 지원할 수 없는 기간입니다");
        }
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UsernameNotFoundException("해당 회원을 찾을 수 없습니다"));
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new IllegalArgumentException("해당 스터디를 찾을 수 없습니다"));
        if (studyApplyRepository.countByStudy(study) >= study.getMaxParticipants() * 2) {
            throw new IllegalStateException("해당 스터디는 마감되었습니다");
        }
        if (studyApplyRepository.existsByStudyAndUser(study, user)) {
            throw new IllegalStateException("이미 지원한 스터디입니다");
        }
        StudyApply studyApply = StudyApply.builder()
                .study(study)
                .user(user)
                .build();
        studyApplyRepository.save(studyApply);
    }

    public List<GetStudyListResponse> getStudyList(GetStudyListParameter parameter) {
        Pageable pageable = PageRequest.of(parameter.getPage(), 10);
        String search = parameter.getSearch();
        Page<Study> studies;
        if (search != null && !search.isEmpty()) {
            studies = studyRepository.findByCategoryOrTitleContaining(search, pageable);
        } else {
            studies = studyRepository.findAll(pageable);
        }
        return studies.stream()
                .map(study -> GetStudyListResponse.builder()
                        .id(study.getId())
                        .user(study.getStudyTutees().stream()
                                .map(tutee -> GetStudyListResponse.User.builder()
                                        .id(tutee.getUser().getId())
                                        .grade(tutee.getUser().getGrade())
                                        .name(tutee.getUser().getName())
                                        .build())
                                .collect(Collectors.toList())
                        )
                        .title(study.getTitle())
                        .year(study.getYear())
                        .day(study.getDay())
                        .category(study.getCategory())
                        .semester(study.getSemester())
                        .participants(study.getStudyTutees().size())
                        .maxParticipants(study.getMaxParticipants())
                        .type(study.getType())
                        .build()
                )
                .collect(Collectors.toList());
    }

    public GetStudyResponse getStudy(Integer studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new IllegalArgumentException("해당 스터디를 찾을 수 없습니다"));
        return GetStudyResponse.builder()
                .id(study.getId())
                .isDeleted(study.getIsDeleted())
                .maker(GetStudyResponse.User.builder()
                        .id(study.getMaker().getId())
                        .grade(study.getMaker().getGrade())
                        .name(study.getMaker().getName())
                        .build())
                .title(study.getTitle())
                .year(study.getYear())
                .day(study.getDay())
                .category(study.getCategory())
                .description(study.getDescription())
                .semester(study.getSemester())
                .location(study.getLocation())
                .type(study.getType())
                .maxParticipants(study.getMaxParticipants())
                .participants(study.getStudyTutees().stream()
                        .map(participant -> GetStudyResponse.User.builder()
                                .id(participant.getId())
                                .grade(participant.getUser().getGrade())
                                .name(participant.getUser().getName())
                                .build()
                        )
                        .collect(Collectors.toList())
                )
                .files(study.getStudyFiles().stream()
                        .map(file -> GetStudyResponse.File.builder()
                                .fileId(file.getId())
                                .url("/upload/study/" + file.getName())
                                .title(file.getTitle())
                                .build()
                        )
                        .collect(Collectors.toList())
                )
                .build();
    }

    @Transactional
    public void acceptStudy(AcceptStudyRequest request) {
        Integer studyId = request.getStudyId();
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new IllegalArgumentException("해당 스터디를 찾을 수 없습니다"));
        for (AcceptStudyRequest.User user : request.getUsers()) {
            Integer userId = user.getUserId();
            StudyApply studyApply = studyApplyRepository.findByStudyIdAndUserId(studyId, userId)
                    .orElseThrow(() -> new IllegalArgumentException("지원자를 찾을 수 없습니다"));
            if (!studyApply.getStatus().equals(StudyApplyStatus.PENDING)) {
                throw new IllegalStateException("이미 승인/거절한 지원자입니다");
            }
            User userEntity = userRepository.findById(userId)
                    .orElseThrow(() -> new UsernameNotFoundException("해당 회원을 찾을 수 없습니다"));
            studyApply.changeStatus(StudyApplyStatus.APPROVED);
            StudyTutee studyTutee = StudyTutee.builder()
                    .study(study)
                    .user(userEntity)
                    .build();
            studyTuteeRepository.save(studyTutee);
        }
    }
}
