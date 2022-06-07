import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/model/Team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.scss']
})
export class UpdateTeamComponent implements OnInit {

  teams: Team = new Team();

  tid!: number;

  constructor(private teamService: TeamService, 
    private router: Router,
    private route: ActivatedRoute,
    private snack: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.tid = this.route.snapshot.params['tid'];
    console.log(this.tid);
    this.teamService.getTeambyID(this.tid).subscribe( data => {
      this.teams = data;
    });
  }

  goToTeamList(){
    this.router.navigate(['admin/team-details'])
  }

  onSubmit(){
    this.teamService.updateTeam(this.tid, this.teams).subscribe( data => {
      this.goToTeamList();
      this.snack.open("Team Updated", 'Close', {
        duration: 5000
      })
    })
  }


}
