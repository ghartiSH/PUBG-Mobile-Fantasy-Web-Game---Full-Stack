import {Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { News } from 'src/app/model/News';
import { Tournament } from 'src/app/model/Tournament';
import { NewsService } from 'src/app/services/news.service';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tournaments!: Tournament[];
  news!: News[];

  constructor(private tournamentService: TournamentServiceService,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private newsService: NewsService,
    ) { }

  ngOnInit(): void {
    this.tournamentService.getallTournaments().subscribe( data =>{
      this.tournaments =data;
      for(let i=0; i< this.tournaments.length; i++){
        this.tournaments[i].image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' 
        + this.tournaments[i].image);
      }
    });

    this.newsService.getAllNews().subscribe( data =>{
      this.news = data;
      for(let i=0; i< this.news.length; i++){
        this.news[i].image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
        + this.news[i].image);
      };
    });
  }

  getTournament(){
    this.tournamentService.getallTournaments().subscribe(data =>{
      this.tournaments = data;
    })
  }

  browseNews(id: number){
    this.router.navigate(['news', id])
  }
}
