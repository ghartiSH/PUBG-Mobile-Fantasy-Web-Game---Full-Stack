import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Team } from 'src/app/model/Team';
import { Tournament } from 'src/app/model/Tournament';
import { TeamService } from 'src/app/services/team.service';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';

@Component({
  selector: 'app-add-teams',
  templateUrl: './add-teams.component.html',
  styleUrls: ['./add-teams.component.scss']
})
export class AddTeamsComponent implements OnInit {

  tournaments!: Tournament[];
  tournamentId!: number;
  file: any;

  teams: Team = new Team();

  constructor(private teamService: TeamService, 
    private tournamentService: TournamentServiceService, 
    private snack: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  addTeam(){
    this.teamService.addTeam(this.file, this.teams, this.tournamentId).subscribe(data =>
      {console.log(data);}
    )
  }

  onSubmit(){
    this.addTeam();
    this.snack.open("Team Added Succesfully in tournament: " + this.tournamentId , "Close", {
      duration: 5000});
  }  

  onChange(event:any){
    this.file = event.target.files[0];
    console.log(this.file);
  }
}
