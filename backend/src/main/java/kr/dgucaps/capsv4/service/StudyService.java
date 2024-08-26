package kr.dgucaps.capsv4.service;

import kr.dgucaps.capsv4.dto.request.CreateStudyRequest;
import kr.dgucaps.capsv4.entity.Study;
import kr.dgucaps.capsv4.entity.StudyApply;
import kr.dgucaps.capsv4.entity.StudyFile;
import kr.dgucaps.capsv4.entity.User;
import kr.dgucaps.capsv4.repository.StudyApplyRepository;
import kr.dgucaps.capsv4.repository.StudyConfigRepository;
import kr.dgucaps.capsv4.repository.StudyRepository;
import kr.dgucaps.capsv4.repository.UserRepository;
import kr.dgucaps.capsv4.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StudyService {

    private final StudyRepository studyRepository;
    private final UserRepository userRepository;
    private final StudyFileService studyFileService;
    private final StudyConfigRepository studyConfigRepository;
    private final StudyApplyRepository studyApplyRepository;

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
}
