import {Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/model/Team';
import { Tournament } from 'src/app/model/Tournament';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  tournamentid!: number;

  tournament: Tournament = new Tournament();
  teams!: Team[];

  constructor(private route: ActivatedRoute, private tournamentService: TournamentServiceService,private _sanitizer: DomSanitizer,) {
  }

  ngOnInit(): void {
    this.route.parent!.paramMap.subscribe( param =>{
      this.tournamentid = parseInt(param.get('id')!);
    });

    this.tournamentService.getTournamentbyId(this.tournamentid).subscribe( data =>{
    this.tournament = data;
    this.teams = data.teams;
      
      for(let i=0; i< this.teams.length; i++){
        this.teams[i].image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' 
        + this.teams[i].image);
      }
      this.tournament.image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.tournament.image);
    });

    
  }

}
