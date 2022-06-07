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
public class MatchDays {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long matchDay;
    private String date;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL,targetEntity = Tournaments.class, fetch = FetchType.EAGER)
    private Tournaments tournaments;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Fixtures.class)
    private List<Fixtures> fixtures;

    public MatchDays(long day, String date){
        this.matchDay = day;
        this.date = date;
    }
}

