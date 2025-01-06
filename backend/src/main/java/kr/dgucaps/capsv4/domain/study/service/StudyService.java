package kr.dgucaps.capsv4.domain.study.service;

import kr.dgucaps.capsv4.domain.file.entity.StudyFile;
import kr.dgucaps.capsv4.domain.file.repository.StudyFileRepository;
import kr.dgucaps.capsv4.domain.file.service.StudyFileService;
import kr.dgucaps.capsv4.domain.study.dto.*;
import kr.dgucaps.capsv4.domain.study.entity.*;
import kr.dgucaps.capsv4.domain.study.exception.*;
import kr.dgucaps.capsv4.domain.study.repository.*;
import kr.dgucaps.capsv4.domain.user.entity.User;
import kr.dgucaps.capsv4.domain.user.exception.UserNotFoundException;
import kr.dgucaps.capsv4.domain.user.repository.UserRepository;
import kr.dgucaps.capsv4.global.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    private final StudyFileRepository studyFileRepository;

    @Transactional
    public void createStudy(CreateStudyRequest request) throws IOException {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
        Study study = request.toEntity(user);
        studyRepository.save(study);
        if (request.getFiles() != null && !request.getFiles().isEmpty()) {
            for (MultipartFile file : request.getFiles()) {
                StudyFile studyFile = studyFileService.store(file, study);
                study.getStudyFiles().add(studyFile);
            }
        }
    }

    @Transactional
    public void applyStudy(Integer studyId) {
        String applyStartDateString = studyConfigRepository.findByConfigKey("APPLY_START_DATE")
                .orElseThrow(StudyConfigNotSetException::new).getConfigValue();
        String applyEndDateString = studyConfigRepository.findByConfigKey("APPLY_END_DATE")
                .orElseThrow(StudyConfigNotSetException::new).getConfigValue();
        LocalDate applyStartDate = LocalDate.parse(applyStartDateString);
        LocalDate applyEndDate = LocalDate.parse(applyEndDateString);
        LocalDate currentDate = LocalDate.now();
        if (currentDate.isBefore(applyStartDate) || currentDate.isAfter(applyEndDate)) {
            throw new StudyNotApplicationPeriodException();
        }
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new StudyNotFoundException(studyId));
        if (studyApplyRepository.countByStudy(study) >= study.getMaxParticipants() * 2) {
            throw new StudyApplicationClosedException();
        }
        if (studyApplyRepository.existsByStudyAndUser(study, user)) {
            throw new StudyAlreadyAppliedException();
        }
        StudyApply studyApply = StudyApply.builder()
                .study(study)
                .user(user)
                .build();
        studyApplyRepository.save(studyApply);
    }

    public List<GetStudyListResponse> getStudyList(GetStudyListParameter parameter) {
        Pageable pageable = PageRequest.of(parameter.getPage(), 10, Sort.by(Sort.Direction.DESC, "id"));
        String search = parameter.getSearch();
        Page<Study> studies;
        if (search != null && !search.isEmpty()) {
            studies = studyRepository.findByCategoryOrTitleContaining(search, pageable);
        } else {
            studies = studyRepository.findAll(pageable);
        }
        int totalPages = studies.getTotalPages();
        return studies.stream()
                .map(study -> GetStudyListResponse.builder()
                        .id(study.getId())
                        .user(GetStudyListResponse.User.builder()
                                .id(study.getMaker().getId())
                                .grade(study.getMaker().getGrade())
                                .name(study.getMaker().getName())
                                .build())
                        .title(study.getTitle())
                        .year(study.getYear())
                        .day(study.getDay())
                        .category(study.getCategory())
                        .semester(study.getSemester())
                        .participants(study.getStudyTutees().size())
                        .maxParticipants(study.getMaxParticipants())
                        .type(study.getType())
                        .totalPages(totalPages)
                        .build()
                )
                .collect(Collectors.toList());
    }

    public GetStudyResponse getStudy(Integer studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new StudyNotFoundException(studyId));
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
                .orElseThrow(() -> new StudyNotFoundException(studyId));
        for (AcceptStudyRequest.User user : request.getUsers()) {
            Integer userId = user.getUserId();
            StudyApply studyApply = studyApplyRepository.findByStudyIdAndUserId(studyId, userId)
                    .orElseThrow(() -> new StudyApplyNotFoundException(studyId, userId));
            if (!studyApply.getStatus().equals(StudyApplyStatus.PENDING)) {
                throw new StudyApplicationAlreadyProcessedException();
            }
            User userEntity = userRepository.findById(userId)
                    .orElseThrow(() -> new UserNotFoundException(userId));
            studyApply.changeStatus(StudyApplyStatus.APPROVED);
            StudyTutee studyTutee = StudyTutee.builder()
                    .study(study)
                    .user(userEntity)
                    .build();
            studyTuteeRepository.save(studyTutee);
        }
    }

    public List<GetStudyApplyListResponse> getStudyApplyList(Integer studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new StudyNotFoundException(studyId));
        List<StudyApply> studyApplyList = studyApplyRepository.findByStudy(study);
        return studyApplyList.stream()
                .map(studyApply -> GetStudyApplyListResponse.builder()
                        .id(studyApply.getId())
                        .user(GetStudyApplyListResponse.User.builder()
                                .id(studyApply.getUser().getId())
                                .grade(studyApply.getUser().getGrade())
                                .name(studyApply.getUser().getName())
                                .build())
                        .time(studyApply.getDateTime())
                        .status(studyApply.getStatus())
                        .build()
                )
                .collect(Collectors.toList());
    }

    @Transactional
    public void modifyStudy(Integer studyId, ModifyStudyRequest request) throws IOException {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new StudyNotFoundException(studyId));
        if (!user.getUserId().equals(study.getMaker().getUserId())) {
            throw new StudyNotAuthorException();
        }
        if (request.getTitle() != null) {
            study.updateTitle(request.getTitle());
        }
        if (request.getCategory() != null) {
            study.updateCategory(request.getCategory());
        }
        if (request.getDescription() != null) {
            study.updateDescription(request.getDescription());
        }
        if (request.getDay() != null) {
            study.updateDay(request.getDay());
        }
        if (request.getLocation() != null) {
            study.updateLocation(request.getLocation());
        }
        if (request.getType() != null) {
            study.updateType(request.getType());
        }
        if (request.getMaxParticipants() != null) {
            study.updateMaxParticipants(request.getMaxParticipants());
        }
        if (request.getFiles() != null && !request.getFiles().isEmpty()) {
            studyFileRepository.deleteAll(study.getStudyFiles());
            study.getStudyFiles().clear();
            for (MultipartFile file : request.getFiles()) {
                StudyFile studyFile = studyFileService.store(file, study);
                study.getStudyFiles().add(studyFile);
            }
        }
    }

    @Transactional
    public void deleteStudy(Integer studyId) {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
        Study study = studyRepository.findById(studyId)
                .orElseThrow(() -> new StudyNotFoundException(studyId));
        if (!user.getUserId().equals(study.getMaker().getUserId())) {
            throw new StudyNotAuthorException();
        }
        studyRepository.deleteById(studyId);
    }

    @Transactional
    public void kickStudy(KickStudyRequest request) {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
        Study study = studyRepository.findById(request.getStudyId())
                .orElseThrow(() -> new StudyNotFoundException(request.getStudyId()));
        if (!user.getUserId().equals(study.getMaker().getUserId())) {
            throw new StudyNotAuthorException();
        }
        for (KickStudyRequest.User kickUser : request.getUsers()) {
            Integer userId = kickUser.getUserId();
            studyTuteeRepository.deleteByStudyIdAndUserId(request.getStudyId(), userId);
            studyApplyRepository.deleteByStudyIdAndUserId(request.getStudyId(), userId);
        }
    }

    @Transactional
    public void withdrawStudy(Integer studyId) {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
        StudyApply studyApply = studyApplyRepository.findByStudyIdAndUserId(studyId, user.getId())
                .orElseThrow(() -> new StudyApplyNotFoundException(studyId, user.getId()));
        if (!user.getId().equals(studyApply.getUser().getId())) {
            throw new StudyNotApplicantException();
        }
        if (!studyApply.getStatus().equals(StudyApplyStatus.PENDING)) {
            throw new StudyApplicationAlreadyProcessedException();
        }
        studyApplyRepository.deleteById(studyApply.getId());
    }
}
