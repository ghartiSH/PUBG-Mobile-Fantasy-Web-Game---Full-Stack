package com.example.backend.Controller;

import com.example.backend.Exception.ResourceNotFoundException;
import com.example.backend.Model.Fixtures;
import com.example.backend.Model.MatchDays;
import com.example.backend.Model.Tournaments;
import com.example.backend.Payload.FixturePld;
import com.example.backend.Payload.MatchDaysPld;
import com.example.backend.Repository.MatchDaysRepository;
import com.example.backend.Repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MatchDaysController {

    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private MatchDaysRepository matchDaysRepository;


    @PostMapping("/matchdays/{tid}")
    public ResponseEntity<?> addMatchDays (@PathVariable long tid, @RequestBody MatchDaysPld matchDaysPld){
        try{
            Tournaments tournaments = tournamentRepository.findById(tid).orElseThrow(()-> new ResourceNotFoundException("ID not found"));
            MatchDays matchDays = matchDaysRepository.save(new MatchDays(matchDaysPld.getMatchDay(), matchDaysPld.getDate()));

            List<MatchDays> mdList = new ArrayList<>();

            if(tournaments.getMatchDays().isEmpty()){
                mdList.add(matchDays);
                tournaments.getMatchDays().clear();
                tournaments.setMatchDays(mdList);
            }
            else{
                mdList= tournaments.getMatchDays();
                if(tournaments.getMatchDays().stream().filter(md -> md.getId() == matchDays.getId()).collect(Collectors.toList()).size()==0){
                    mdList.add(matchDays);
                }
            }
            tournamentRepository.save(tournaments);
            matchDays.setTournaments(tournaments);
            return new ResponseEntity<>(matchDaysRepository.save(matchDays), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }
    @GetMapping("/matchdays")
    public ResponseEntity<List<MatchDays>> getAllMatchDays(){
        return new ResponseEntity(matchDaysRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/matchdays/{mid}")
    public ResponseEntity<MatchDays> getMatchDayById(@PathVariable long mid){
        MatchDays matchDays = matchDaysRepository.findById(mid).orElseThrow(()-> new ResourceNotFoundException("Id not found"));
        return new ResponseEntity<>(matchDays, HttpStatus.OK);
    }
    @PutMapping("/matchdays/{mid}")
    public ResponseEntity<MatchDays> updateMatchDay(@PathVariable long mid, @RequestBody MatchDaysPld matchDaysPld){
        MatchDays matchDays = matchDaysRepository.findById(mid).orElseThrow(()-> new ResourceNotFoundException("Id not found"));
        matchDays.setMatchDay(matchDaysPld.getMatchDay());
        matchDays.setDate(matchDaysPld.getDate());
        return new ResponseEntity<>(matchDaysRepository.save(matchDays), HttpStatus.OK);
    }

}
