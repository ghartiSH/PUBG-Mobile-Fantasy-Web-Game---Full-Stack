package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fixtures {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long fId;
    private long matchNo;
    private String time;
    @Lob
    private String map;
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, targetEntity = MatchDays.class, fetch = FetchType.EAGER)
    private MatchDays matchDays;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = PlayerStatistics.class)
    private List<PlayerStatistics> playerStatistics;

    public Fixtures(long match, String time){
        this.matchNo = match;
        this.time = time;
    }

}
