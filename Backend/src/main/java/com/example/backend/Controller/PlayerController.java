package com.example.backend.Controller;

import com.example.backend.Exception.ResourceNotFoundException;
import com.example.backend.Model.Players;
import com.example.backend.Model.Teams;
import com.example.backend.Payload.PlayerPld;
import com.example.backend.Repository.PlayerRepository;
import com.example.backend.Repository.TeamRepository;
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
public class PlayerController {
    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private TeamRepository teamRepository;

    @PostMapping(value = "/player/{tid}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addPlayer(@PathVariable long tid, @ModelAttribute PlayerPld playerPld){
        try{
            Teams teams = teamRepository.findById(tid).orElseThrow(()-> new ResourceNotFoundException("ID not found"));
            Players players = playerRepository.save(new Players(playerPld.getPlayerId(), playerPld.getPlayerName()));
            players.setImage(Base64.getEncoder().encodeToString(playerPld.getImage().getBytes()));
            List<Players> playersList = new ArrayList<>();
            if(teams.getPlayers().isEmpty()){
                playersList.add(players);
                teams.setPlayers(playersList);
            }
            else{
                playersList = teams.getPlayers();
               if(teams.getPlayers().stream().filter(player ->player.getPlayerId() == players.getPlayerId()).collect(Collectors.toList()).size()==0){
                    playersList.add(players);
                }
            }
            teamRepository.save(teams);
            players.setTeams(teams);
            return new ResponseEntity<Object>(playerRepository.save(players), HttpStatus.OK);

        }
        catch (Exception e){
           return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/player")
    public ResponseEntity<List<Players>> getAllPlayers(){
        return new ResponseEntity(playerRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/player/{pid}")
    public ResponseEntity<Players> getPlayerById(@PathVariable long pid){
        Players players = playerRepository.findById(pid).orElseThrow(()-> new ResourceNotFoundException("Player not found"));
        return new ResponseEntity<>(players, HttpStatus.OK);
    }

    @PutMapping("/player/{pid}")
    public ResponseEntity<Players> editPlayer(@PathVariable long pid, @RequestBody Players requestPlayer){
        Players players = playerRepository.findById(pid).orElseThrow(()-> new ResourceNotFoundException("Player not found"));
        players.setPlayerName(requestPlayer.getPlayerName());
        return new ResponseEntity<>(playerRepository.save(players), HttpStatus.OK);
    }

    @DeleteMapping("/player/{pid}")
    public ResponseEntity<?> deletePlayer(@PathVariable long pid){
        playerRepository.deleteById(pid);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
