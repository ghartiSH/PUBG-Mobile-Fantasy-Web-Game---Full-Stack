package com.example.backend.Payload;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Lob;

@Data
public class TeamPld {
    private long teamId;
    private String teamName;
    private String region;
    private String country;
    private MultipartFile image;
}
