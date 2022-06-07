package com.example.backend.Controller;

import com.example.backend.Exception.ResourceNotFoundException;
import com.example.backend.Model.Fixtures;
import com.example.backend.Model.PlayerStatistics;
import com.example.backend.Repository.FixtureRepository;
import com.example.backend.Repository.PlayerStatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PlayerStatisticsController {
    @Autowired
    private FixtureRepository fixtureRepository;
    @Autowired
    private PlayerStatisticsRepository playerStatisticsRepository;

    @PostMapping("playerstats/{fid}")
    public ResponseEntity<?> addStats(@PathVariable long fid, @RequestBody PlayerStatistics playerStatistics){
        Fixtures fixtures = fixtureRepository.findById(fid).orElseThrow(()-> new ResourceNotFoundException("Id not found"));
        PlayerStatistics stats = playerStatisticsRepository.save(new PlayerStatistics(playerStatistics.getPid(), playerStatistics.getKills(), playerStatistics.getAssists(), playerStatistics.getDamage(), playerStatistics.getSurTime()));
        List<PlayerStatistics> fList = new ArrayList<>();
        if(fixtures.getPlayerStatistics().isEmpty()){
            fList.add(stats);
            fixtures.getPlayerStatistics().clear();
            fixtures.setPlayerStatistics(fList);
        }
        else{
            fList= fixtures.getPlayerStatistics();
            if(fixtures.getPlayerStatistics().stream().filter(fix -> fix.getId()== stats.getId()).collect(Collectors.toList()).size()==0){
                fList.add(stats);
            }
        }
        fixtureRepository.save(fixtures);
        stats.setFixtures(fixtures);
        return new ResponseEntity<>(playerStatisticsRepository.save(stats), HttpStatus.OK);
    }

    @GetMapping("/playerstats")
    public ResponseEntity<List<PlayerStatistics>> getAllPlayerStats(){
        return new ResponseEntity(playerStatisticsRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/playerstats/{sid}")
    public ResponseEntity<PlayerStatistics> getPlayerStatsById(@PathVariable long sid){
        PlayerStatistics playerStatistics = playerStatisticsRepository.findById(sid).orElseThrow(()-> new ResourceNotFoundException("ID not found"));
        return new ResponseEntity<>(playerStatistics, HttpStatus.OK);
    }

    @PutMapping("/playerstats/{sid}")
    public ResponseEntity<PlayerStatistics> updatePlayerStats(@PathVariable long sid, @RequestBody PlayerStatistics playerStatisticsReq){
        PlayerStatistics playerStatistics = playerStatisticsRepository.findById(sid).orElseThrow(()-> new ResourceNotFoundException("ID not found"));
        playerStatistics.setKills(playerStatisticsReq.getKills());
        playerStatistics.setAssists(playerStatisticsReq.getAssists());
        playerStatistics.setDamage(playerStatisticsReq.getDamage());
        playerStatistics.setSurTime(playerStatisticsReq.getSurTime());
        return new ResponseEntity<>(playerStatisticsRepository.save(playerStatistics), HttpStatus.OK);
    }
}
