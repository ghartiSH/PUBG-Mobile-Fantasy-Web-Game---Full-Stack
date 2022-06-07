package com.example.backend.Controller;

import com.example.backend.Exception.ResourceNotFoundException;
import com.example.backend.Model.Fixtures;
import com.example.backend.Model.MatchDays;
import com.example.backend.Payload.FixturePld;
import com.example.backend.Repository.FixtureRepository;
import com.example.backend.Repository.MatchDaysRepository;
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
public class FixturesController {

    @Autowired
    private FixtureRepository fixtureRepository;

    @Autowired
    private MatchDaysRepository matchDaysRepository;

    @PostMapping(value = "/fixtures/{tid}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addFixture (@PathVariable long tid, @ModelAttribute FixturePld fixturePld){
        try{
            MatchDays matchDays = matchDaysRepository.findById(tid).orElseThrow(()-> new ResourceNotFoundException("ID not found"));
            Fixtures fixtures1 = fixtureRepository.save(new Fixtures(fixturePld.getMatchNo(), fixturePld.getTime()));
            fixtures1.setMap(Base64.getEncoder().encodeToString(fixturePld.getMap().getBytes()));
            List<Fixtures> fList = new ArrayList<>();
            if(matchDays.getFixtures().isEmpty()){
                fList.add(fixtures1);
                matchDays.getFixtures().clear();
                matchDays.setFixtures(fList);
            }
            else{
                fList= matchDays.getFixtures();
                if(matchDays.getFixtures().stream().filter(fix -> fix.getFId()==fixtures1.getFId()).collect(Collectors.toList()).size()==0){
                    fList.add(fixtures1);
                }
            }
            matchDaysRepository.save(matchDays);
            fixtures1.setMatchDays(matchDays);
            return new ResponseEntity<>(fixtureRepository.save(fixtures1), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }

    @GetMapping("/fixtures")
    public ResponseEntity<List<Fixtures>> getAllFixtures(){
        return new ResponseEntity(fixtureRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/fixtures/{fid}")
    public ResponseEntity<Fixtures> getFixtureById(@PathVariable long fid){
        Fixtures fixtures = fixtureRepository.findById(fid).orElseThrow(()-> new ResourceNotFoundException("ID not found"));
        return new ResponseEntity<>(fixtures, HttpStatus.OK);
    }

    @PutMapping("/fixtures/{fid}")
    public ResponseEntity<Fixtures> updateFixture(@PathVariable long fid, @ModelAttribute FixturePld fixturePld){
        Fixtures fixtures = fixtureRepository.findById(fid).orElseThrow(()-> new ResourceNotFoundException("ID not found"));
        fixtures.setMatchNo(fixturePld.getMatchNo());
        fixtures.setTime(fixturePld.getTime());
        return new ResponseEntity<>(fixtures, HttpStatus.OK);
    }
}
