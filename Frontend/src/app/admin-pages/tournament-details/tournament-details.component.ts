import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/model/Tournament';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss']
})

export class TournamentDetailsComponent implements OnInit {
  tournaments!: Tournament[];

  constructor(private tournamentService: TournamentServiceService,
    private router: Router,
    ) { }
  displayedColumns: string[] = ['tournamentId', 'tournamentName', 'region', 'startDate', 'endDate', 'prizePool', 'tier', 'actions'];

  ngOnInit(): void {
    this.tournamentService.getallTournaments().subscribe( data =>{
      this.tournaments =data;
    })
  }

  getTournament(){
    this.tournamentService.getallTournaments().subscribe(data =>{
      this.tournaments = data;
    })
  }

  deleteTournament(id: number){
    if (confirm("Are you sure to delete the item?")){
      this.tournamentService.deleteTournament(id).subscribe(data => {
        this.getTournament();
      })
    }
  }

  viewTournament(id: number){
    this.router.navigate(['admin/view-tournament', id]);
  }

  updateTournament(id: number){
    this.router.navigate(['admin/update-tournament', id]);
  }

}
