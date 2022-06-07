import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from 'src/app/model/Tournament';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';

@Component({
  selector: 'app-update-tournament',
  templateUrl: './update-tournament.component.html',
  styleUrls: ['./update-tournament.component.scss']
})
export class UpdateTournamentComponent implements OnInit {

  tournament: Tournament = new Tournament();
  id!: number;
  constructor( private tournamentServide: TournamentServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tournamentServide.getTournamentbyId(this.id).subscribe( data =>{
      this.tournament = data;
    })
  }

  goToTournamentList(){
    this.router.navigate(['admin/tournament-details'])
  }

  onSubmit(){

    this.tournamentServide.updateTournament(this.id, this.tournament).subscribe(data => {
      this.goToTournamentList();
      this.snack.open("Tournament Updated", 'Close',{
        duration: 5000})
    })
  }
}