package kr.dgucaps.capsv4.domain.board.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ModifyBoardRequest {

    private Integer category;

    private String title;

    private String content;

    private List<MultipartFile> files;
}
