package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class PlayerStatistics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long pid;
    private long kills;
    private long assists;
    private long damage;
    private long surTime;

    public PlayerStatistics(long player, long kill, long assist, long damage, long surTime){
        this.pid = player;
        this.kills = kill;
        this.assists = assist;
        this.damage = damage;
         this.surTime = surTime;
    }

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL,targetEntity = Fixtures.class, fetch = FetchType.EAGER)
    private Fixtures fixtures;
}
