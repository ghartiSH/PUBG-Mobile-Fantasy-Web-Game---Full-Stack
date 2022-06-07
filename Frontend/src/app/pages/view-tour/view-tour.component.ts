import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PTeam } from 'src/app/admin-pages/view-tournament/view-tournament.component';
import { Team } from 'src/app/model/Team';
import { Tournament } from 'src/app/model/Tournament';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';

@Component({
  selector: 'app-view-tour',
  templateUrl: './view-tour.component.html',
  styleUrls: ['./view-tour.component.scss']
})
export class ViewTourComponent implements OnInit {

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
