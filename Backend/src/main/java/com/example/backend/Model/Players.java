package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Players {
    @Id
    private long playerId;
    private String playerName;

    @Lob
    private String image;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, targetEntity = Teams.class)
    private Teams teams;

    public Players(long playerId, String playerName) {
        this.playerId = playerId;
        this.playerName = playerName;
    }
}
