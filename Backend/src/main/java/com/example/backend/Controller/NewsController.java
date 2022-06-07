package com.example.backend.Controller;

import com.example.backend.Exception.ResourceNotFoundException;
import com.example.backend.Model.News;
import com.example.backend.Payload.NewsPld;
import com.example.backend.Repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class NewsController {

    @Autowired
    private NewsRepository newsRepository;

    @PostMapping(value = "/news", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<News> addNews(@ModelAttribute NewsPld newsPld){
        try{
            News news = newsRepository.save(new News(newsPld.getHeading(), newsPld.getContent()));
            news.setImage(Base64.getEncoder().encodeToString(newsPld.getImage().getBytes()));
            return new ResponseEntity(newsRepository.save(news),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/news")
    public ResponseEntity<List<News>> getAllNews(){
        return new ResponseEntity<>(newsRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/news/{nid}")
    public ResponseEntity<News> getNewsById(@PathVariable Long nid){
        News news = newsRepository.findById(nid).orElseThrow(()-> new ResourceNotFoundException("News not found"));
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    @PutMapping("/news/{nid}")
    public ResponseEntity<News> updateNews(@PathVariable Long nid, @ModelAttribute NewsPld newsPld){
        try{
            News news = newsRepository.findById(nid).orElseThrow(()-> new ResourceNotFoundException("News not found"));
            news.setHeading(newsPld.getHeading());
            news.setContent(newsPld.getContent());
            news.setImage(Base64.getEncoder().encodeToString(newsPld.getImage().getBytes()));
            return new ResponseEntity<>(newsRepository.save(news), HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/news/{nid}")
    public ResponseEntity<?> deleteNews(@PathVariable Long nid){
        newsRepository.deleteById(nid);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
