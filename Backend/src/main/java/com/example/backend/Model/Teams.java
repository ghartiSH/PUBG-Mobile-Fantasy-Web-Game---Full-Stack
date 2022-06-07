package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Teams {
    @Id
    private long teamId;

    private String teamName;
    private String region;
    private String country;

    @Lob
    private String image;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL,targetEntity = Tournaments.class, fetch = FetchType.EAGER)
    private Tournaments tournaments;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Players.class)
    private List<Players> players;

    public Teams(long teamId, String teamName, String region, String country) {
        this.teamId = teamId;
        this.teamName = teamName;
        this.region = region;
        this.country = country;
    }
}
