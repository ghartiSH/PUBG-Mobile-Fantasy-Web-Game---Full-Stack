package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class UserTeam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL,targetEntity = User.class, fetch = FetchType.EAGER)
    private User user;

    private long tournamentId;
    private  long fixtureId;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, targetEntity = Players.class)
    @JoinTable(name = "userTeam_Players", joinColumns = {@JoinColumn(name = "team_id")}, inverseJoinColumns = { @JoinColumn(name = "player_id")})
    private List<Players> players;

    public UserTeam( String name){
        this.name = name;
    }

}
