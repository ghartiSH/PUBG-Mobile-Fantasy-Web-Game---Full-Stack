import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/model/Team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {

  teams!: Team[];
  constructor(private teamService: TeamService, 
    private router: Router
    ) { }

  displayedColumns: string[] = ['teamId', 'teamName', 'region', 'country', 'actions'];

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe( data =>
      {
        this.teams = data;
      })
  }

  update(id: number){
    this.router.navigate(['admin/update-team', id]);
  }

}
