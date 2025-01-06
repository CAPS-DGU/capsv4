package kr.dgucaps.capsv4.domain.vote.service;

import kr.dgucaps.capsv4.domain.user.entity.User;
import kr.dgucaps.capsv4.domain.user.exception.UserNotFoundException;
import kr.dgucaps.capsv4.domain.user.repository.UserRepository;
import kr.dgucaps.capsv4.domain.vote.entity.*;
import kr.dgucaps.capsv4.domain.vote.dto.VoteRequest;
import kr.dgucaps.capsv4.domain.vote.dto.GetVoteResponse;
import kr.dgucaps.capsv4.domain.vote.dto.GetVoteResultResponse;
import kr.dgucaps.capsv4.domain.vote.entity.ids.VoteUserId;
import kr.dgucaps.capsv4.domain.vote.exception.*;
import kr.dgucaps.capsv4.domain.vote.repository.VoteChoiceRepository;
import kr.dgucaps.capsv4.domain.vote.repository.VoteRepository;
import kr.dgucaps.capsv4.domain.vote.repository.VoteResultRepository;
import kr.dgucaps.capsv4.domain.vote.repository.VoteUserRepository;
import kr.dgucaps.capsv4.global.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
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
                .orElseThrow(VoteNotFoundException::new);
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
                .orElseThrow(VoteNotFoundException::new);
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(vote.getStartDate()) || now.isAfter(vote.getEndDate())) {
            throw new VoteNotPeriodException();
        }
        if (vote.getStatus() != VoteStatus.OPENED) {
            throw new VoteNotOpen();
        }
        if (voteUserRepository.existsByVoteAndUser(vote, user)) {
            throw new VoteAlreadyCompleted();
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
                .orElseThrow(() -> new VoteChoiceNotFoundException(request.getChoiceId()));
        VoteResult voteResult = VoteResult.builder()
                .vote(vote)
                .voteChoice(voteChoice)
                .build();
        if (!voteUserRepository.existsByVoteAndUser(vote, user)) {
            throw new VoteUserNotFoundException(vote.getId(), user.getId());
        }
        voteResultRepository.save(voteResult);
    }

    public GetVoteResultResponse getVoteResult(Integer voteId) {
        Vote vote = voteRepository.findById(voteId)
                .orElseThrow(VoteNotFoundException::new);
        if (vote.getStatus() != VoteStatus.OPENED) {
            throw new VoteNotOpen();
        }
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(vote.getEndDate())) {
            throw new VoteNotEnded();
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
