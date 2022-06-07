import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Players } from 'src/app/model/Player';
import { Team } from 'src/app/model/Team';
import { UserTeam } from 'src/app/model/UserTeam';
import { MatchDayService } from 'src/app/services/match-day.service';
import { PlayerService } from 'src/app/services/player.service';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserTeamService } from 'src/app/services/user-team.service';
import { UserService } from 'src/app/services/user.service';
import { SelectPlayersComponent } from '../select-players/select-players.component';

@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.scss']
})
export class MyteamComponent implements OnInit {

  tourId!: number;
  fixtureId!: number;
  user!: string;

  userTeam!: UserTeam[];
  toShowList: any = null;

  toAddUserTeam: UserTeam = new UserTeam();

  selectedPlayer1!: Players;
  selectedPlayer2!: Players;
  selectedPlayer3!: Players;
  selectedPlayer4!: Players;

  todayDate = new Date().toLocaleDateString();
  //todayDate = "4/14/2022";
  matchDays: any[] =[];
  matchDay!: number;

  constructor(private route: ActivatedRoute, private userAuth: UserAuthService, private _sanitizer: DomSanitizer,
    private userService: UserService, public dialog: MatDialog, private playerService: PlayerService,
    private userTeamService: UserTeamService,private tournamentService: TournamentServiceService ) {
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
                 this.toShowList.players[j].image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.toShowList.players[j].image);
               }
               break;
             }
           }
         }});
    });



  }

  openDialog1() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      trId: this.tourId
    };
    const dialogRef = this.dialog.open(SelectPlayersComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.toAddUserTeam.player1Id = data;
      this.playerService.getPlayerById(this.toAddUserTeam.player1Id).subscribe(data => {
        this.selectedPlayer1 = data;
        this.selectedPlayer1.image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.selectedPlayer1.image);
      });

    });

  }
  openDialog2() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      trId: this.tourId
    };
    const dialogRef = this.dialog.open(SelectPlayersComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.toAddUserTeam.player2Id = data;
      this.playerService.getPlayerById(this.toAddUserTeam.player2Id).subscribe(data => {
        this.selectedPlayer2 = data;
        this.selectedPlayer2.image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.selectedPlayer2.image);
      });

    });
  }
  openDialog3() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      trId: this.tourId
    };
    const dialogRef = this.dialog.open(SelectPlayersComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.toAddUserTeam.player3Id = data;
      this.playerService.getPlayerById(this.toAddUserTeam.player3Id).subscribe(data => {
        this.selectedPlayer3 = data;
        this.selectedPlayer3.image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.selectedPlayer3.image);
      });
    });
  }

  openDialog4() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      trId: this.tourId
    };
    const dialogRef = this.dialog.open(SelectPlayersComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.toAddUserTeam.player4Id = data;
      this.playerService.getPlayerById(this.toAddUserTeam.player4Id).subscribe(data => {
        this.selectedPlayer4 = data;
        console.log(data);
        this.selectedPlayer4.image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.selectedPlayer4.image);
      });
    });
  }

  onSubmit() {
    this.toAddUserTeam.tournamentId = this.tourId;
    this.toAddUserTeam.username = this.user;
    this.userTeamService.addUserTeam(this.toAddUserTeam, this.user).subscribe(data => {
      console.log(data);
    });
  }

}
