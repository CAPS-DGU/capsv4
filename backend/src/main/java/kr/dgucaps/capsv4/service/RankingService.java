package kr.dgucaps.capsv4.service;

import kr.dgucaps.capsv4.dto.response.GetRankingResponse;
import kr.dgucaps.capsv4.entity.User;
import kr.dgucaps.capsv4.repository.PointRepository;
import kr.dgucaps.capsv4.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RankingService {

    private final UserRepository userRepository;
    private final PointRepository pointRepository;

    public List<GetRankingResponse> getTotalRanking() {
        List<User> users = userRepository.findAllUsersOrderByTotalPointDesc();
        List<GetRankingResponse> rankings = new ArrayList<>();
        int rank = 1;
        int sameRankCount = 1;
        Integer previousPoints = null;
        for (User user : users) {
            if (previousPoints != null && !previousPoints.equals(user.getTotalPoint())) {
                rank += sameRankCount;
                sameRankCount = 1;
            } else {
                sameRankCount++;
            }
            previousPoints = user.getTotalPoint();
            rankings.add(GetRankingResponse.builder()
                    .rank(rank)
                    .userId(user.getId())
                    .grade(user.getGrade())
                    .name(user.getName())
                    .comment(user.getComment())
                    .postCount(user.getBoards().size())
                    .commentCount(user.getComments().size())
                    .point(user.getTotalPoint())
                    .build());
        }
        return rankings;
    }

    public List<GetRankingResponse> getMonthlyRanking() {
        LocalDateTime firstDayOfCurrentMonth = LocalDateTime.now()
                .withDayOfMonth(1).withHour(0)
                .withMinute(0).withSecond(0)
                .withNano(0);
        List<Object[]> pointsData = pointRepository.findRankingByPoints(firstDayOfCurrentMonth);
        List<User> allUsers = userRepository.findAll();
        Map<Integer, Integer> userPointsMap = new HashMap<>();
        for (Object[] data : pointsData) {
            User user = (User) data[0];
            Integer totalPoints = (Integer) data[1];
            userPointsMap.put(user.getId(), totalPoints);
        }
        List<GetRankingResponse> rankings = new ArrayList<>();
        int rank = 1;
        int sameRankCount = 1;
        Integer previousPoints = null;
        for (User user : allUsers) {
            Integer totalPoints = userPointsMap.getOrDefault(user.getId(), 0);
            if (previousPoints != null && !previousPoints.equals(totalPoints)) {
                rank += sameRankCount;
                sameRankCount = 1;
            } else {
                sameRankCount++;
            }
            previousPoints = totalPoints;
            rankings.add(GetRankingResponse.builder()
                    .rank(rank)
                    .userId(user.getId())
                    .grade(user.getGrade())
                    .name(user.getName())
                    .comment(user.getComment())
                    .postCount(user.getBoards().size())
                    .commentCount(user.getComments().size())
                    .point(totalPoints)
                    .build());
        }
        return rankings;
    }

    public List<GetRankingResponse> getOldRanking() {
        List<User> users = userRepository.findAllUsersOrderByPointDesc();
        List<GetRankingResponse> rankings = new ArrayList<>();
        int rank = 1;
        int sameRankCount = 1;
        Integer previousPoints = null;
        for (User user : users) {
            if (previousPoints != null && !previousPoints.equals(user.getPoint())) {
                rank += sameRankCount;
                sameRankCount = 1;
            } else {
                sameRankCount++;
            }
            previousPoints = user.getPoint();
            rankings.add(GetRankingResponse.builder()
                    .rank(rank)
                    .userId(user.getId())
                    .grade(user.getGrade())
                    .name(user.getName())
                    .comment(user.getComment())
                    .postCount(user.getBoards().size())
                    .commentCount(user.getComments().size())
                    .point(user.getPoint())
                    .build());
        }
        return rankings;
    }
}
