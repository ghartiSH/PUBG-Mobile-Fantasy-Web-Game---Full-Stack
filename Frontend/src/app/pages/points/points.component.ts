import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Fixture } from 'src/app/model/Fixture';
import { UserTeam } from 'src/app/model/UserTeam';
import { MatchDayService } from 'src/app/services/match-day.service';
import { PlayerService } from 'src/app/services/player.service';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserTeamService } from 'src/app/services/user-team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {

  tourId!: number;
  fixtureId!: number;
  user!: string;

  userTeam!: UserTeam[];
  toShowList: any = null;

  todayDate = new Date().toLocaleDateString();
  //todayDate = "4/14/2022";
  matchDays: any[] =[];
  matchDay!: number;

  fixtures: Fixture[] = [];
  playerIds: any[] = [];
  gameDay!: any;
  gameDate!:any;

  totalPoints: number = 0;

  constructor(private route: ActivatedRoute, private userAuth: UserAuthService, private _sanitizer: DomSanitizer,
    private userService: UserService, public dialog: MatDialog, private matchDayService: MatchDayService,
    private tournamentService: TournamentServiceService ) {
  }

  ngOnInit(): void {
    //getting tournament id
    this.route.parent!.paramMap.subscribe(param => {
      this.tourId = parseInt(param.get('id')!);
    });
    //getting tournament
    this.tournamentService.getTournamentbyId(this.tourId).subscribe( data => {
      this.matchDays = data.matchDays; //getting matchdays from the tournament

      let found = false;
      for(let i = 0; i< this.matchDays.length; i++){
        //getting todays match fixture
        if((new Date(this.matchDays[i].date)).toLocaleDateString() == this.todayDate){
          found = true;
          //if found todays fixture then assigning todays id to get the team
          this.matchDay = this.matchDays[i].id;
          break;
        }
      }
       //getting user
       this.user = (this.userAuth.getUser());
       //getting user data
       this.userService.getUserbyId(this.user).subscribe(userdata => {
         this.userTeam = userdata.userTeam;
         if (this.userTeam.length != 0) {
           for (let i = 0; i < this.userTeam.length; i++) {
             //checking if the user team has valid tournament id and todays date
             if (this.userTeam[i].tournamentId == this.tourId && this.userTeam[i].fixtureId == this.matchDay) {
               // if the user has todays fixture team then display it
               this.toShowList = this.userTeam[i];

               for(let j=0; j< this.toShowList.players.length; j++){
                this.playerIds.push(this.toShowList.players[j].playerId);
                 this.toShowList.players[j].image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.toShowList.players[j].image);
               }
               break;
             }
           }
          }
          console.log(this.playerIds);



          // finding the fame day details
          this.matchDayService.getMatchDayById(this.matchDay).subscribe (data => {
            this.fixtures = data.fixtures;//getting all fixtures
            this.gameDay = data.matchDay; //getting match days

            let p1Total = 0;
            let p2Total = 0;
            let p3Total = 0;
            let p4Total = 0;

              for(let x=0; x< this.fixtures.length; x++){
                for(let y=0; y< this.fixtures[x].playerStatistics.length; y++){
                  if(this.playerIds[0] == this.fixtures[x].playerStatistics[y].pid){
                    p1Total = p1Total + this.fixtures[x].playerStatistics[y].kills * 4 + this.fixtures[x].playerStatistics[y].assists * 2 + ~~((this.fixtures[x].playerStatistics[y].damage)/100);
                    if(this.fixtures[x].playerStatistics[y].surTime < 10){
                      p1Total = p1Total - 3;
                     }
                  }
                  if(this.playerIds[1] == this.fixtures[x].playerStatistics[y].pid){
                    p2Total = p2Total + this.fixtures[x].playerStatistics[y].kills * 4 + this.fixtures[x].playerStatistics[y].assists * 2 + ~~((this.fixtures[x].playerStatistics[y].damage)/100);
                    if(this.fixtures[x].playerStatistics[y].surTime < 10){
                      p2Total = p2Total - 3;
                    }
                  }
                  if(this.playerIds[2] == this.fixtures[x].playerStatistics[y].pid){
                    p3Total = p3Total + this.fixtures[x].playerStatistics[y].kills * 4 + this.fixtures[x].playerStatistics[y].assists * 2 + ~~((this.fixtures[x].playerStatistics[y].damage)/100);
                    if(this.fixtures[x].playerStatistics[y].surTime < 10){
                      p3Total = p3Total - 3;
                    }
                  }
                  if(this.playerIds[3] == this.fixtures[x].playerStatistics[y].pid){
                    p4Total = p4Total + this.fixtures[x].playerStatistics[y].kills * 4 + this.fixtures[x].playerStatistics[y].assists * 2 + ~~((this.fixtures[x].playerStatistics[y].damage)/100);
                    if(this.fixtures[x].playerStatistics[y].surTime < 10){
                      p4Total = p4Total - 3;
                    }
                  }
                }
              }
              this.toShowList.players[0].points = p1Total;
              this.toShowList.players[1].points = p2Total;
              this.toShowList.players[2].points = p3Total;
              this.toShowList.players[3].points = p4Total;
              this.totalPoints = p1Total + p2Total + p3Total + p4Total;
           });    
        });
    });

  }

}
