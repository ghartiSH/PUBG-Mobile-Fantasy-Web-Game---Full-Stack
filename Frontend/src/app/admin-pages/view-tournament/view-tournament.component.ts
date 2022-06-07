import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/model/Team';
import { Tournament } from 'src/app/model/Tournament';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';

export interface PTeam{
  id: number;
  name: string;
  region: string;
  country: string;
  image: any;
}

@Component({
  selector: 'app-view-tournament',
  templateUrl: './view-tournament.component.html',
  styleUrls: ['./view-tournament.component.scss']
})



export class ViewTournamentComponent implements OnInit {

  id!: number;
  tournament!: Tournament;
  imagefile!: any;

  teams!: Team[];

  tempTeam!: PTeam[];

  constructor( private route: ActivatedRoute, 
    private tournamentService: TournamentServiceService,
    private _sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.params['id'];
    this.tournament = new Tournament();

    this.tournamentService.getTournamentbyId(this.id).subscribe (data => {
      this.teams = data.teams;
      
      for(let i=0; i< this.teams.length; i++){
        this.teams[i].image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' 
        + this.teams[i].image);
      }

      this.imagefile = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' 
      + data.image);
      this.tournament = data;
    });

  }

}
