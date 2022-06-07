import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fixture } from 'src/app/model/Fixture';
import { PlayerStats } from 'src/app/model/PlayerStats';
import { Tournament } from 'src/app/model/Tournament';
import { PlayerStatsService } from 'src/app/services/player-stats.service';

@Component({
  selector: 'app-add-player-stats',
  templateUrl: './add-player-stats.component.html',
  styleUrls: ['./add-player-stats.component.scss']
})
export class AddPlayerStatsComponent implements OnInit {

  fixture!: Fixture[];
  fixtureId!: number;

  playerStats: PlayerStats = new PlayerStats();

  constructor(private pstatService: PlayerStatsService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }
  addPlayerStat(){
    this.pstatService.addPlayerStat(this.playerStats, this.fixtureId).subscribe(data =>
      {console.log(data);}
    )
  }

  onSubmit(){
    this.addPlayerStat();
    this.snack.open("Player Stats Added Succesfully in fixture: " + this.fixtureId , "Close", {
      duration: 5000});
  }  

}
