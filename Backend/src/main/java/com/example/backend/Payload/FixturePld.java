package com.example.backend.Payload;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FixturePld {
    private long fId;
    private long matchNo;
    private String time;
    private MultipartFile map;
}
