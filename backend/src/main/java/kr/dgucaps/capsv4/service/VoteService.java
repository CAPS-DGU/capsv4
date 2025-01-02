package kr.dgucaps.capsv4.service;

import kr.dgucaps.capsv4.domain.user.entity.User;
import kr.dgucaps.capsv4.domain.user.repository.UserRepository;
import kr.dgucaps.capsv4.dto.request.VoteRequest;
import kr.dgucaps.capsv4.dto.response.GetVoteResponse;
import kr.dgucaps.capsv4.dto.response.GetVoteResultResponse;
import kr.dgucaps.capsv4.entity.*;
import kr.dgucaps.capsv4.entity.ids.VoteUserId;
import kr.dgucaps.capsv4.repository.*;
import kr.dgucaps.capsv4.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VoteService {

    private final UserRepository userRepository;
    private final VoteRepository voteRepository;
    private final VoteUserRepository voteUserRepository;
    private final VoteChoiceRepository voteChoiceRepository;
    private final VoteResultRepository voteResultRepository;

    public GetVoteResponse getVote() {
        Vote vote = voteRepository.findByStatus(VoteStatus.OPENED)
                .orElseThrow(() -> new IllegalArgumentException("투표가 존재하지 않습니다."));
        LocalDateTime now = LocalDateTime.now();
        Object totalVotes = now.isBefore(vote.getEndDate()) ? null : voteResultRepository.countByVote(vote);
        return GetVoteResponse.builder()
                .id(vote.getId())
                .title(vote.getTitle())
                .startDate(vote.getStartDate())
                .endDate(vote.getEndDate())
                .status(vote.getStatus())
                .totalVotes(totalVotes)
                .choices(vote.getVoteChoices().stream()
                        .map(voteChoice ->
                                GetVoteResponse.Choice.builder()
                                    .id(voteChoice.getId())
                                    .content(voteChoice.getContent())
                                    .build()
                        )
                        .collect(Collectors.toList())
                )
                .build();
    }

    @Transactional
    public void vote(VoteRequest request) {
        Vote vote = voteRepository.findById(request.getVoteId())
                .orElseThrow(() -> new IllegalArgumentException("투표가 존재하지 않습니다."));
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UsernameNotFoundException("해당 회원을 찾을 수 없습니다."));
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(vote.getStartDate()) || now.isAfter(vote.getEndDate())) {
            throw new IllegalStateException("투표 가능 시간이 아닙니다");
        }
        if (vote.getStatus() != VoteStatus.OPENED) {
            throw new IllegalStateException("투표가 불가능합니다.");
        }
        if (voteUserRepository.existsByVoteAndUser(vote, user)) {
            throw new IllegalStateException("이미 투표를 완료한 사용자입니다.");
        }
        VoteUser voteUser = VoteUser.builder()
                .id(VoteUserId.builder()
                        .voteId(request.getVoteId())
                        .userId(user.getId())
                        .build())
                .vote(vote)
                .user(user)
                .voteTime(LocalDateTime.now())
                .clientIp(request.getClientIp())
                .build();
        voteUserRepository.save(voteUser);
        VoteChoice voteChoice = voteChoiceRepository.findById(request.getChoiceId())
                .orElseThrow(() -> new IllegalArgumentException("선택지가 존재하지 않습니다."));
        VoteResult voteResult = VoteResult.builder()
                .vote(vote)
                .voteChoice(voteChoice)
                .build();
        if (!voteUserRepository.existsByVoteAndUser(vote, user)) {
            throw new IllegalStateException("투표 기록이 존재하지 않으므로 결과를 저장할 수 없습니다.");
        }
        voteResultRepository.save(voteResult);
    }

    public GetVoteResultResponse getVoteResult(Integer voteId) {
        Vote vote = voteRepository.findById(voteId)
                .orElseThrow(() -> new IllegalArgumentException("투표가 존재하지 않습니다."));
        if (vote.getStatus() != VoteStatus.OPENED) {
            throw new IllegalStateException("투표가 공개되지 않았습니다.");
        }
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(vote.getEndDate())) {
            throw new IllegalStateException("투표가 아직 종료되지 않았습니다.");
        }
        int totalVotes = voteResultRepository.countByVote(vote);
        List<GetVoteResultResponse.Result> results = voteChoiceRepository.findByVote(vote).stream()
                .map(choice -> {
                    int numberOfVotes = voteResultRepository.countByVoteAndVoteChoice(vote, choice);
                    return GetVoteResultResponse.Result.builder()
                            .id(choice.getId())
                            .content(choice.getContent())
                            .numberOfVotes(numberOfVotes)
                            .build();
                })
                .toList();
        return GetVoteResultResponse.builder()
                .id(voteId)
                .title(vote.getTitle())
                .startDate(vote.getStartDate())
                .endDate(vote.getEndDate())
                .totalVotes(totalVotes)
                .status(vote.getStatus())
                .result(results)
                .build();
    }
}
