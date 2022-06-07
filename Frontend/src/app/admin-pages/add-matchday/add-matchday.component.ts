import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatchDay } from 'src/app/model/MatchDay';
import { Tournament } from 'src/app/model/Tournament';
import { FixturesService } from 'src/app/services/fixtures.service';
import { MatchDayService } from 'src/app/services/match-day.service';

@Component({
  selector: 'app-add-matchday',
  templateUrl: './add-matchday.component.html',
  styleUrls: ['./add-matchday.component.scss']
})
export class AddMatchdayComponent implements OnInit {

  tournaments!: Tournament[];
  tournamentId!: number;

  matchDay: MatchDay = new MatchDay();

  constructor(private matchDayService: MatchDayService,
    private snack: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  addMatchDay(){
    this.matchDayService.addMatchDay(this.matchDay, this.tournamentId).subscribe( data =>
      {console.log(data);}
    )
  }

  onSubmit(){
    this.addMatchDay();
    this.snack.open("Matchday Added Succesfully in tournament: " + this.tournamentId , "Close", {
      duration: 5000});
  }  

}
