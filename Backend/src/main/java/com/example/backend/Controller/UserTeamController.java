package com.example.backend.Controller;

import com.example.backend.Exception.ResourceNotFoundException;
import com.example.backend.Model.Players;
import com.example.backend.Model.Tournaments;
import com.example.backend.Model.User;
import com.example.backend.Model.UserTeam;
import com.example.backend.Payload.UserTeamPld;
import com.example.backend.Repository.PlayerRepository;
import com.example.backend.Repository.TournamentRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Repository.UserTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserTeamController {
    @Autowired
    private UserTeamRepository userTeamRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @PostMapping("/userteam/{uid}")
    public UserTeam createUserTeam(@PathVariable String uid, @RequestBody UserTeamPld userTeamPld){
        User user = userRepository.findById(uid).orElseThrow(()-> new ResourceNotFoundException("User not found"));
        UserTeam userTeam = userTeamRepository.save(new UserTeam(userTeamPld.getName()));
        userTeam.setTournamentId(userTeamPld.getTournamentId());
        userTeam.setFixtureId(userTeamPld.getFixtureId());
        List<Players> playersList = new ArrayList<>();

        Players player1 = playerRepository.findById(userTeamPld.getPlayer1Id()).get();
        playersList.add(player1);

        Players player2 = playerRepository.findById(userTeamPld.getPlayer2Id()).get();
        playersList.add(player2);

        Players player3 = playerRepository.findById(userTeamPld.getPlayer3Id()).get();
        playersList.add(player3);

        Players player4 = playerRepository.findById(userTeamPld.getPlayer4Id()).get();
        playersList.add(player4);

        userTeam.setPlayers(playersList);

        List<UserTeam> userTeamList = new ArrayList<>();

        if(user.getUserTeam().isEmpty()){
            userTeamList.add(userTeam);
            user.getUserTeam().clear();
            user.setUserTeam(userTeamList);
        }
        else{
            userTeamList = user.getUserTeam();
            if(user.getUserTeam().stream().filter(team -> team.getId() == userTeam.getId()).collect(Collectors.toList()).size()==0){
                userTeamList.add(userTeam);
            }
        }
        userRepository.save(user);
        userTeam.setUser(user);
        return userTeamRepository.save(userTeam);

    }

    @GetMapping("/userteam")
    public List<UserTeam> getAllUserTeams(){
        return userTeamRepository.findAll();
    }


}
