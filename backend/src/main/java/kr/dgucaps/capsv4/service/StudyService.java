package kr.dgucaps.capsv4.service;

import kr.dgucaps.capsv4.dto.request.CreateStudyRequest;
import kr.dgucaps.capsv4.entity.Study;
import kr.dgucaps.capsv4.entity.StudyFile;
import kr.dgucaps.capsv4.entity.User;
import kr.dgucaps.capsv4.repository.StudyRepository;
import kr.dgucaps.capsv4.repository.UserRepository;
import kr.dgucaps.capsv4.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StudyService {

    private final StudyRepository studyRepository;
    private final UserRepository userRepository;
    private final StudyFileService studyFileService;

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
}
