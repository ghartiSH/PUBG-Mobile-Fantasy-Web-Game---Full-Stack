package com.example.backend.Payload;

import com.example.backend.Model.Teams;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class TournamentPld {
    private String tournamentName;
    private String region;
    private String startDate;
    private String endDate;
    private Long prizePool;
    private String tier;
    private MultipartFile image;
}
