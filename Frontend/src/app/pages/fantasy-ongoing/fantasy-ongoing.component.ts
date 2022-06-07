import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/model/Tournament';
import { TournamentServiceService } from 'src/app/services/tournament-service.service';

@Component({
  selector: 'app-fantasy-ongoing',
  templateUrl: './fantasy-ongoing.component.html',
  styleUrls: ['./fantasy-ongoing.component.scss']
})
export class FantasyOngoingComponent implements OnInit {

  tournaments!: Tournament[];
  ongoing: Tournament[]=[];
  hasValue: boolean = true;

  constructor(private tourService: TournamentServiceService, private _sanitizer: DomSanitizer, private router:Router) {
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
  
  playFantasy(id: number){
    this.router.navigate(['/fantasy', id]);
  }

}
