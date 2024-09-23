package kr.dgucaps.capsv4.dto.request;

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
