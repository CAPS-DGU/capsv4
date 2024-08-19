package kr.dgucaps.capsv4.dto.request;

import kr.dgucaps.capsv4.entity.Board;
import kr.dgucaps.capsv4.entity.User;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class CreateBoardRequest {

    private Integer category;

    private String title;

    private String content;

    private List<MultipartFile> files;

    public Board toEntity(User user) {
        return Board.builder()
                .user(user)
                .category(category)
                .title(title)
                .content(content)
                .build();
    }
}
