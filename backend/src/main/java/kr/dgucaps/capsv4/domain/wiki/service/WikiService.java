package kr.dgucaps.capsv4.domain.wiki.service;

import kr.dgucaps.capsv4.domain.user.exception.UserNotFoundException;
import kr.dgucaps.capsv4.domain.wiki.dto.CreateOrModifyWikiRequest;
import kr.dgucaps.capsv4.domain.wiki.dto.GetRandomWikiResponse;
import kr.dgucaps.capsv4.domain.wiki.dto.GetWikiHistoryResponse;
import kr.dgucaps.capsv4.domain.wiki.dto.GetWikiResponse;
import kr.dgucaps.capsv4.domain.wiki.dto.GetRecentWikiResponse;
import kr.dgucaps.capsv4.domain.user.entity.User;
import kr.dgucaps.capsv4.domain.wiki.entity.Wiki;
import kr.dgucaps.capsv4.domain.user.repository.UserRepository;
import kr.dgucaps.capsv4.domain.wiki.repository.WikiRepository;
import kr.dgucaps.capsv4.global.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WikiService {

    private final UserRepository userRepository;
    private final WikiRepository wikiRepository;

    @Transactional
    public void createOrModifyWiki(CreateOrModifyWikiRequest request) {
        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
                .orElseThrow(() -> new UserNotFoundException(SecurityUtil.getCurrentUserName()));
        if (wikiRepository.existsByTitleAndIsDeletedFalse(request.getTitle())) {
            wikiRepository.deleteByTitleAndIsDeletedFalse(request.getTitle());
        }
        Wiki wiki = Wiki.builder()
                .writer(user)
                .title(request.getTitle())
                .content(request.getContent())
                .build();
        wikiRepository.save(wiki);
    }

    public GetWikiResponse getWiki(String title) {
        Optional<Wiki> optionalWiki = wikiRepository.findByTitleAndIsDeletedFalse(title);
        if (optionalWiki.isEmpty()) {
            return GetWikiResponse.builder()
                    .exist(false)
                    .build();
        }
        Wiki wiki = optionalWiki.get();
        return GetWikiResponse.builder()
                .exist(true)
                .title(wiki.getTitle())
                .content(wiki.getContent())
                .time(wiki.getDateTime())
                .writer(GetWikiResponse.Writer.builder()
                        .id(wiki.getWriter().getId())
                        .grade(wiki.getWriter().getGrade())
                        .name(wiki.getWriter().getName())
                        .build())
                .build();
    }

    public List<GetWikiHistoryResponse> getWikiHistory(String title) {
        List<Wiki> wikiHistoryList = wikiRepository.findByTitleOrderByDateTimeDesc(title);
        return wikiHistoryList.stream()
                .map(wikiHistory -> GetWikiHistoryResponse.builder()
                        .title(wikiHistory.getTitle())
                        .content(wikiHistory.getContent())
                        .time(wikiHistory.getDateTime())
                        .writer(GetWikiHistoryResponse.Writer.builder()
                                .id(wikiHistory.getWriter().getId())
                                .grade(wikiHistory.getWriter().getGrade())
                                .name(wikiHistory.getWriter().getName())
                                .build()
                        )
                        .build()
                )
                .collect(Collectors.toList());
    }

//    @Transactional
//    public void modifyWiki(ModifyWikiRequest request) {
//        User user = userRepository.findByUserId(SecurityUtil.getCurrentUserName())
//                .orElseThrow(() -> new UsernameNotFoundException("해당 회원을 찾을 수 없습니다"));
//        wikiRepository.deleteByTitleAndIsDeletedFalse(request.getTitle());
//        Wiki wiki = Wiki.builder()
//                .writer(user)
//                .title(request.getTitle())
//                .content(request.getContent())
//                .build();
//        wikiRepository.save(wiki);
//    }

    public GetRandomWikiResponse getRandomWiki() {
        String title = wikiRepository.findRandomTitle();
        return GetRandomWikiResponse.builder()
                .title(title)
                .build();
    }

    public List<GetRecentWikiResponse> getRecentWiki(){
        List<Wiki> recentWikiList = wikiRepository.findFirst10ByOrderByDateTimeDesc();
        return recentWikiList.stream()
                .map(wiki -> GetRecentWikiResponse.title(wiki.getTitle())
                ).collect(Collectors.toList());
    }
}
