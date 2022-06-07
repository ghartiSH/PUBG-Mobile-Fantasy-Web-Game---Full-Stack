import {Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Players } from 'src/app/model/Player';
import { Team } from 'src/app/model/Team';
import { Tournament } from 'src/app/model/Tournament';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  tournamentid!: number;

  tournament: Tournament = new Tournament();
  teams!: Team[];
  players: any[] = [];

  actualPlayerList: Players[] = [];

  constructor(private route: ActivatedRoute, private tournamentService: TournamentServiceService,private _sanitizer: DomSanitizer,) {
  }

  ngOnInit(): void {
    this.route.parent!.paramMap.subscribe( param =>{
      this.tournamentid = parseInt(param.get('id')!);
    });
    
    this.tournamentService.getTournamentbyId(this.tournamentid).subscribe( data => {
      this.tournament = data;
      this.teams = data.teams;

      for(let i = 0; i < this.teams.length!; i++){
        this.players.push(this.teams[i].players);
      } 
      for(let j = 0; j < this.players.length!; j++){
        let toSet = this.teams[j].teamName;
        for(let k =0; k< this.players[j].length!;k++){
          this.players[j][k].team = toSet;
          this.players[j][k].image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.players[j][k].image);
          this.actualPlayerList.push(this.players[j][k]);

        }
      }  
    });

    
  }
  
}
