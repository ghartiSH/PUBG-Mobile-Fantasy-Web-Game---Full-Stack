import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Players } from 'src/app/model/Player';
import { Team } from 'src/app/model/Team';
import { Tournament } from 'src/app/model/Tournament';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';

@Component({
  selector: 'app-select-players',
  templateUrl: './select-players.component.html',
  styleUrls: ['./select-players.component.scss']
})
export class SelectPlayersComponent implements OnInit {

  tourId: number;


  tournament: Tournament = new Tournament();
  teams!: Team[];
  players: any[] = [];

  actualPlayerList: Players[] = [];
  constructor (private tournamentService: TournamentServiceService, private _sanitizer: DomSanitizer, 
    
    private dialogRef: MatDialogRef<SelectPlayersComponent>, @Inject (MAT_DIALOG_DATA) data: any)
    {
      this.tourId = data.trId;

      this.tournamentService.getTournamentbyId(this.tourId).subscribe( data => {
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

  ngOnInit(): void {
  }

  selectClick(id:number){
    this.dialogRef.close(id);
  }


}
