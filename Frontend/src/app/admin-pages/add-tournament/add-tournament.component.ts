import { Component, OnInit, ViewChild } from '@angular/core';
import { Tournament } from 'src/app/model/Tournament';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.scss']
})
export class AddTournamentComponent implements OnInit {

  tournament: Tournament = new Tournament();

  file!: File;

  constructor(private tournamentService: TournamentServiceService,
    private snack: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  addTournament(file: any, tournamentData: Tournament){
    this.tournamentService.addTournament(file, tournamentData).subscribe(data => console.log(data));
  }
  onSubmit(){
    
    this.addTournament(this.file, this.tournament);
    this.snack.open("Tournament Added Succesfully...", "Close", {
      duration: 5000});
  }

  onChange(event:any){
    this.file = event.target.files[0];
  }
}
