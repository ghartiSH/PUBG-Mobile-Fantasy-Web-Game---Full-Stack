import {Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Fixture } from 'src/app/model/Fixture';
import { FixturesService } from 'src/app/services/fixtures.service';
import { MatchDayService } from 'src/app/services/match-day.service';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent implements OnInit {

  id!: number;
  fixtures: Fixture[]=[];

  tournamentId!: number;

  todayDate = new Date().toLocaleDateString();
  //todayDate = "4/14/2022";
  matchDays: any[] =[];
  matchDay!: number;
  gameDay!: any;
  gameDate!:any;

  constructor(private route: ActivatedRoute,
    private tournamentService: TournamentServiceService,
    private matchDayService: MatchDayService,
    private _sanitizer: DomSanitizer,) { }

  ngOnInit(): void {

    this.route.parent!.paramMap.subscribe(param => {
      this.tournamentId = parseInt(param.get('id')!);
    });

    this.tournamentService.getTournamentbyId(this.tournamentId).subscribe(data =>{
      this.matchDays = data.matchDays;

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
      // //if not found assigning one greater date as a match day
      //  if(found == false){
      //   for(let l = 0; l< this.matchDays.length; l++){
      //     if(this.matchDays[l].date > this.todayDate){
      //       this.matchDay = this.matchDays[l].date;
      //       break;
      //     }
      //   }
      //  }
       //finding the same day details
       this.matchDayService.getMatchDayById(this.matchDay).subscribe (data => {
         this.fixtures = data.fixtures;//getting all fixtures
          this.gameDay = data.matchDay; //getting match days
          this.gameDate = new Date(data.date).toLocaleDateString(); //getting the match day date
          //decoding image file
         for(let j=0; j< this.fixtures.length; j++){
          this.fixtures[j].map = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.fixtures[j].map);
          };
       });
      
       
    });

  }

  nextDay(){
  }

}
