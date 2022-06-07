package com.example.backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Tournaments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tournamentId;
    private String tournamentName;
    private String region;
    private String startDate;
    private String endDate;
    private Long prizePool;
    private String tier;
    @Lob
    private String image;

    private String imageContentType;

    private String imageName;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Teams.class)
    private List<Teams> teams;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = MatchDays.class)
    private List<MatchDays> matchDays;



    public Tournaments(String tournamentName, String region,String startDate, String endDate, Long prizePool, String tier) {
        this.tournamentName = tournamentName;
        this.region = region;
        this.startDate = startDate;
        this.endDate = endDate;
        this.prizePool = prizePool;
        this.tier = tier;
    }

}

