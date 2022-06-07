package com.example.backend.Controller;

import com.example.backend.Exception.ResourceNotFoundException;
import com.example.backend.Model.Tournaments;
import com.example.backend.Payload.TournamentPld;
import com.example.backend.Repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class TournamentController {
    @Autowired
    private TournamentRepository tournamentRepository;

    @PostMapping(value = "/tournaments",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Tournaments> addTournament(@ModelAttribute TournamentPld tournamentPld){
        try{
            Tournaments tournamentsObj = tournamentRepository.save(new Tournaments(tournamentPld.getTournamentName(), tournamentPld.getRegion(), tournamentPld.getStartDate(), tournamentPld.getEndDate(), tournamentPld.getPrizePool(), tournamentPld.getTier()));
            tournamentsObj.setImage(Base64.getEncoder().encodeToString(tournamentPld.getImage().getBytes()));
            tournamentsObj.setImageContentType(tournamentPld.getImage().getContentType());
            tournamentsObj.setImageName(tournamentPld.getImage().getOriginalFilename());
            return new ResponseEntity<>(tournamentRepository.save(tournamentsObj), HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/tournaments")
    public ResponseEntity<List<Tournaments>> getAllTournaments(){
        return new ResponseEntity<>(tournamentRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/tournaments/{tid}")
    public ResponseEntity<?> findTournamentById(@PathVariable long tid){
        Tournaments tournaments = tournamentRepository.findById(tid).orElseThrow(()-> new ResourceNotFoundException("ID Not found"));

        Tournaments tournaments1 = tournamentRepository.findByTournamentName(tournaments.getTournamentName());

        return new ResponseEntity<Object>(tournaments1, HttpStatus.OK);


    }

    @PutMapping("/tournaments/{tid}")
    public ResponseEntity<Tournaments> editTournament(@PathVariable long tid, @RequestBody Tournaments tournamentRequest){
        Tournaments tournaments = tournamentRepository.findById(tid).orElseThrow(()-> new ResourceNotFoundException("ID not found"));
        tournaments.setTournamentName(tournamentRequest.getTournamentName());
        tournaments.setRegion(tournamentRequest.getRegion());
        tournaments.setStartDate(tournamentRequest.getStartDate());
        tournaments.setEndDate(tournamentRequest.getEndDate());
        tournaments.setPrizePool(tournamentRequest.getPrizePool());
        tournaments.setTier(tournamentRequest.getTier());

        return new ResponseEntity<>(tournamentRepository.save(tournaments), HttpStatus.OK);
    }

    @DeleteMapping("/tournaments/{tid}")
    public ResponseEntity<?> deleteTournament(@PathVariable long tid){
        tournamentRepository.deleteById(tid);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
