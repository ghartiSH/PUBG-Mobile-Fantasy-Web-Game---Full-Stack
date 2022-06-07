package com.example.backend.Controller;

import com.example.backend.Exception.ResourceNotFoundException;
import com.example.backend.Model.Teams;
import com.example.backend.Model.Tournaments;
import com.example.backend.Payload.TeamPld;
import com.example.backend.Repository.TeamRepository;
import com.example.backend.Repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class TeamController {
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private TournamentRepository tournamentRepository;

    @PostMapping(value = "/team/{tid}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addTeamInTournament(@PathVariable Long tid, @ModelAttribute TeamPld teamPld){
        try{
            Tournaments tournaments = tournamentRepository.findById(tid).orElseThrow(()->new ResourceNotFoundException("ID not found"));
            Teams teams = teamRepository.save(new Teams(teamPld.getTeamId(), teamPld.getTeamName(), teamPld.getRegion(), teamPld.getCountry()));
            teams.setImage(Base64.getEncoder().encodeToString(teamPld.getImage().getBytes()));
            List<Teams> teamsList = new ArrayList<>();
            if(tournaments.getTeams().isEmpty()){
                teamsList.add(teams);
                tournaments.getTeams().clear();
                tournaments.setTeams(teamsList);
            }
            else{
                teamsList = tournaments.getTeams();
                if(tournaments.getTeams().stream().filter(team -> team.getTeamId()==teams.getTeamId()).collect(Collectors.toList()).size()==0){
                    teamsList.add(teams);
                }
            }

            tournamentRepository.save(tournaments);
            teams.setTournaments(tournaments);
            return new ResponseEntity<>(teamRepository.save(teams), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/team/{tid}")
    public ResponseEntity<Teams> getTeamById(@PathVariable long tid){

        Teams teams = teamRepository.findById(tid).orElseThrow(()->new ResourceNotFoundException("ID not Found"));
        return new ResponseEntity<>(teams, HttpStatus.OK);
    }

    @GetMapping("/team")
    public ResponseEntity<?> getAllTeams(){
        return new ResponseEntity<>(teamRepository.findAll(), HttpStatus.OK);
    }

    @PutMapping("/team/{tid}")
    public ResponseEntity<Teams> editTeam(@PathVariable long tid, @RequestBody Teams requestTeam){
        Teams teams = teamRepository.findById(tid).orElseThrow(()->new ResourceNotFoundException("ID not found"));
        teams.setTeamName(requestTeam.getTeamName());
        teams.setCountry(requestTeam.getCountry());
        teams.setRegion(requestTeam.getRegion());
        return new ResponseEntity<>(teamRepository.save(teams), HttpStatus.OK);
    }
}
