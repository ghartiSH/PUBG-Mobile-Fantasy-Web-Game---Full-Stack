import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerStats } from 'src/app/model/PlayerStats';
import { PlayerStatsService } from 'src/app/services/player-stats.service';

@Component({
  selector: 'app-player-stats-details',
  templateUrl: './player-stats-details.component.html',
  styleUrls: ['./player-stats-details.component.scss']
})
export class PlayerStatsDetailsComponent implements OnInit {

  stats!: PlayerStats[]

  constructor(private pStatsService: PlayerStatsService,
    private router: Router,) { }

    displayedColumns: string[] = ['sid', 'pid', 'kills','assists', 'damage', 'surtime', 'actions'];

  ngOnInit(): void {
    this.pStatsService.getAllPlayerStats().subscribe( data => {
      this.stats = data;
    })

  }

  getNews(){
    this.pStatsService.getAllPlayerStats().subscribe( data => {
      this.stats = data;
    })
  }

  viewNews(id: number){
    
  }

  updateNews(id: number){
    
  }


}
