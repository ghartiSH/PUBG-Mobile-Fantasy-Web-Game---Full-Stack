package com.example.backend.Payload;

import com.example.backend.Model.Players;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class UserTeamPld {
    private long id;
    private String name;
    private long tournamentId;
    private long fixtureId;
    private long player1Id;
    private long player2Id;
    private long player3Id;
    private long player4Id;
}
