package com.example.backend.Payload;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Lob;

@Data
public class PlayerPld {
    private long playerId;
    private String playerName;
    private MultipartFile image;
}
