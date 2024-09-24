package kr.dgucaps.capsv4.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class KickStudyRequest {

    private Integer studyId;

    private List<User> users;

    @Data
    public static class User {

        private Integer userId;
    }
}
