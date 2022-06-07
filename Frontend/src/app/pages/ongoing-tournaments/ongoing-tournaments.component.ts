import {Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Tournament } from 'src/app/model/Tournament';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';

@Component({
  selector: 'app-ongoing-tournaments',
  templateUrl: './ongoing-tournaments.component.html',
  styleUrls: ['./ongoing-tournaments.component.scss']
})
export class OngoingTournamentsComponent implements OnInit {

  tournaments!: Tournament[];
  ongoing: Tournament[]=[];
  hasValue: boolean = true;

  constructor(private tourService: TournamentServiceService, private _sanitizer: DomSanitizer,) {
  }

  ngOnInit(): void {
    this.tourService.getallTournaments().subscribe( data => {
      this.tournaments = data;
      for(let i=0; i< this.tournaments.length; i++){
        this.tournaments[i].image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' 
        + this.tournaments[i].image);
      }

      const today = new Date();
      for(var i=0; i<this.tournaments.length; i++){
        if(new Date(this.tournaments[i].endDate) > today && today > new Date(this.tournaments[i].startDate)){
          this.ongoing.push(this.tournaments[i]);
        }
      }
    });
  }

}
