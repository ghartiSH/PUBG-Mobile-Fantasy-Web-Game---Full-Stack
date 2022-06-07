package com.example.backend.Payload;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class NewsPld {
    private long id;
    private String heading;
    private String content;
    private MultipartFile image;
}
